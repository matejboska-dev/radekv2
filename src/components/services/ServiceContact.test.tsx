import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ServiceContact from './ServiceContact';
import { serviceContent } from '@/data/services';

const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }));
vi.mock('@/integrations/supabase/client', () => ({ isSupabaseConfigured: true, supabase: { functions: { invoke } } }));

function fillAndSubmit() {
  fireEvent.change(screen.getByLabelText('Jméno a příjmení'), { target: { value: 'Testovací zájemce' } });
  fireEvent.change(screen.getByLabelText('Telefon'), { target: { value: '+420 123 456 789' } });
  fireEvent.submit(screen.getByRole('form'));
}

describe('Service enquiry', () => {
  beforeEach(() => { invoke.mockReset(); (window as Window & { dataLayer?: unknown[] }).dataLayer = []; });
  afterEach(cleanup);
  it('includes service context and shows success only after a confirmed response', async () => {
    invoke.mockResolvedValue({ data: { success: true }, error: null });
    render(<MemoryRouter><ServiceContact service={serviceContent.pronajem} /></MemoryRouter>);
    fillAndSubmit();
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Děkuji za zprávu'));
    expect(invoke).toHaveBeenCalledWith('send-email', { body: expect.objectContaining({ name: 'Testovací zájemce', phone: '+420 123 456 789', formType: 'contact', message: 'Pronájem nemovitostí v Příbrami\n\n' }) });
    expect((window as Window & { dataLayer?: unknown[] }).dataLayer).toContainEqual({ event: 'service_lead_submitted', service: 'pronajem', placement: 'contact_form', page_path: '/' });
  });
  it('preserves fields and offers a retry when delivery fails', async () => {
    invoke.mockResolvedValue({ data: { error: 'Delivery failed' }, error: null });
    render(<MemoryRouter><ServiceContact service={serviceContent.koupe} /></MemoryRouter>);
    fillAndSubmit();
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Zprávu se nepodařilo odeslat'));
    expect(screen.getByLabelText('Jméno a příjmení')).toHaveValue('Testovací zájemce');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Odeslat nezávaznou/ })).toBeEnabled();
    expect((window as Window & { dataLayer?: unknown[] }).dataLayer).toEqual([]);
  });
  it('prevents duplicate submissions while a request is pending', async () => {
    invoke.mockReturnValue(new Promise(() => {}));
    render(<MemoryRouter><ServiceContact service={serviceContent.koupe} /></MemoryRouter>);
    fillAndSubmit();
    fireEvent.submit(screen.getByRole('form'));
    await waitFor(() => expect(invoke).toHaveBeenCalledTimes(1));
    expect(screen.getByRole('button', { name: /Odesílám/ })).toBeDisabled();
  });
});
