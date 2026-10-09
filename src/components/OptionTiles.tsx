import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type OptionTile = {
  value: string;
  label: string;
  icon: LucideIcon;
  hint?: string;
};

type OptionTilesProps = {
  name: string;
  options: OptionTile[];
  required?: boolean;
  /** Počet sloupců na mobilu / od sm výše. */
  columns?: 'two' | 'three' | 'four' | 'five';
  size?: 'md' | 'sm';
};

const gridCols = {
  two: 'grid-cols-2',
  three: 'grid-cols-2 sm:grid-cols-3',
  four: 'grid-cols-2 sm:grid-cols-4',
  five: 'grid-cols-2 sm:grid-cols-5',
};

/**
 * Výběr jedné možnosti jako dlaždice s ikonou. Pod kapotou nativní radio inputy,
 * takže funguje FormData, klávesnice (šipky) i `required` bez další logiky.
 */
const OptionTiles = ({ name, options, required, columns = 'three', size = 'md' }: OptionTilesProps) => (
  <div
    role="radiogroup"
    // Osamocená poslední dlaždice na mobilu se roztáhne přes oba sloupce.
    className={cn('grid gap-2.5 [&>label:last-child:nth-child(odd)]:col-span-2 sm:[&>label:last-child:nth-child(odd)]:col-span-1', gridCols[columns])}
  >
    {options.map((option, index) => (
      <label key={option.value} className="relative block cursor-pointer">
        <input
          type="radio"
          name={name}
          value={option.value}
          required={required && index === 0}
          className="peer sr-only"
        />
        <span
          className={cn(
            'flex h-full flex-col items-center justify-center gap-1.5 rounded-xl border border-input bg-background text-center text-foreground transition-all duration-200',
            size === 'md' ? 'px-2 py-4' : 'px-2 py-3',
            'hover:-translate-y-0.5 hover:border-secondary/60 hover:shadow-md',
            'peer-checked:border-secondary peer-checked:bg-secondary/[0.07] peer-checked:shadow-md peer-checked:ring-1 peer-checked:ring-secondary',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2',
            '[&_svg]:transition-colors peer-checked:[&_svg]:text-secondary peer-checked:[&_svg]:stroke-secondary',
          )}
        >
          <option.icon className={cn('text-muted-foreground', size === 'md' ? 'h-6 w-6' : 'h-5 w-5')} aria-hidden="true" />
          <span className="text-sm font-semibold leading-tight">{option.label}</span>
          {option.hint && <span className="text-[11px] leading-tight text-muted-foreground">{option.hint}</span>}
        </span>
      </label>
    ))}
  </div>
);

export default OptionTiles;
