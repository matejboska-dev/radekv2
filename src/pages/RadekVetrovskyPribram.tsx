import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import radekPhoto from '@/assets/radek-vetrovsky.png';
import { setPageMeta } from '@/lib/seo';

const RadekVetrovskyPribram = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        const cleanupMeta = setPageMeta(
            'Radek Větrovský | Realitní makléř Příbram',
            'Jsem Radek Větrovský, nezávislý a certifikovaný realitní makléř působící v Příbrami a okolí. Kontaktujte mě pro bezplatný odhad.',
            '/radek-vetrovsky-realitni-makler-pribram'
        );
        return () => cleanupMeta();
    }, []);

    return (
        <div className="min-h-screen bg-background flex flex-col pt-24">
            {/* We could use react-helmet or similar for head tags but we'll trust the component approach mostly */}
            <Header />

            <main className="flex-grow container mx-auto px-4 py-12 md:py-20 lg:py-24">
                <div className="max-w-4xl mx-auto">
                    {/* Breadcrumbs for SEO */}
                    <nav className="text-sm font-medium text-muted-foreground mb-8">
                        <ol className="flex items-center space-x-2">
                            <li>
                                <a href="/" className="hover:text-primary transition-colors">Domů</a>
                            </li>
                            <li>
                                <span className="mx-2">/</span>
                            </li>
                            <li className="text-foreground" aria-current="page">
                                Radek Větrovský - realitní makléř Příbram
                            </li>
                        </ol>
                    </nav>

                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
                                Radek Větrovský - realitní makléř <span className="text-secondary italic">Příbram</span>
                            </h1>

                            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                                <p className="lead space-y-4">
                                    <strong>Jsem Radek Větrovský, nezávislý a certifikovaný realitní makléř působící v Příbrami a jejím širokém okolí pod křídly sítě RE/MAX Power 2.</strong>
                                </p>
                                <p>
                                    Soustředím se na lokalitu okresu Příbram. Místní trh s nemovitostmi nejen dobře znám, ale aktivně v něm žiji a pracuji.
                                    Moje působnost zahrnuje samotné centrum města Příbram (od historického centra po sídliště, Zdaboř, Březové Hory a další čtvrti),
                                    ale i okolní města a obce jako jsou Dobříš, Sedlčany, Rožmitál pod Třemšínem, Březnice, Jince, Hostomice a mnoho dalších.
                                    Zajišťuji prodej a pronájem bytů, domů, chat, chalup i pozemků.
                                </p>

                                <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Moje zkušenosti a přístup</h2>
                                <ul className="list-disc pl-5 space-y-2 mb-6">
                                    <li><strong>Odbornost:</strong> Oceňování nemovitostí, špičkový marketing, homestaging a profi fotografie.</li>
                                    <li><strong>Transparentnost:</strong> Žádné skryté poplatky. Všechna pravidla spolupráce znáte předem.</li>
                                    <li><strong>Právní jistota:</strong> Kompletní právní servis včetně advokátní úschovy kupní ceny.</li>
                                    <li><strong>Lokální zaměření:</strong> Detailní znalost cenových map a reálných prodejních cen v Příbrami.</li>
                                </ul>

                                <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Co říkají moji klienti (Reference)</h2>
                                <blockquote className="border-l-4 border-secondary pl-4 italic bg-muted/50 p-4 rounded-r-lg my-4">
                                    "Velká spokojenost s panem Větrovským. Vše proběhlo hladce od A až po Z. Výborná komunikace a na čem jsme se domluvili, to klaplo. Mohu jen doporučit!"
                                    <footer className="text-sm mt-2 text-foreground font-semibold">— Marcel Novotný</footer>
                                </blockquote>
                                <blockquote className="border-l-4 border-secondary pl-4 italic bg-muted/50 p-4 rounded-r-lg my-4">
                                    "Rádi bychom poděkovali panu Větrovskému za skvělou spolupráci. Byl vždy profesionální, ochotný, spolehlivý a měl lidský přístup."
                                    <footer className="text-sm mt-2 text-foreground font-semibold">— Martina Tůmová</footer>
                                </blockquote>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="sticky top-24">
                                <div className="rounded-2xl overflow-hidden border-2 border-border/20 shadow-xl relative aspect-[3/4]">
                                    <img
                                        src={radekPhoto}
                                        alt="Radek Větrovský - realitní makléř v Příbrami"
                                        className="w-full h-full object-cover object-bottom"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <h3 className="text-xl font-bold mb-1">Radek Větrovský</h3>
                                        <p className="text-white/80 text-sm mb-4">RE/MAX Power 2</p>
                                        <a
                                            href="tel:+420721855854"
                                            className="block w-full text-center bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-3 px-4 rounded-lg transition-colors"
                                        >
                                            Zavolejte mi
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
            <FloatingCTA />
        </div>
    );
};

export default RadekVetrovskyPribram;
