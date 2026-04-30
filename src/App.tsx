import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  Moon, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Lock, 
  Star,
  ChevronRight,
  TrendingUp,
  Brain,
  Coffee,
  Sun,
  Smile,
  Instagram,
  Check
} from "lucide-react";

/**
 * ── COMPONENTS ──
 */

const ShootingStar = () => {
  const [position, setPosition] = useState({ top: -100, left: -100, angle: 45 });

  useEffect(() => {
    const trigger = () => {
      const startX = Math.random() * 100;
      const startY = Math.random() * 50;
      setPosition({ top: startY, left: startX, angle: 30 + Math.random() * 30 });
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.7) trigger();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
      animate={position.top !== -100 ? {
        opacity: [0, 1, 0],
        scale: [1, 1.2, 0],
        x: [0, 300],
        y: [0, 150],
      } : {}}
      transition={{ duration: 1.2, ease: "easeOut" }}
      onAnimationComplete={() => setPosition({ top: -100, left: -100, angle: 45 })}
      className="absolute w-1 h-1 bg-white rounded-full z-10"
      style={{
        top: `${position.top}%`,
        left: `${position.left}%`,
        boxShadow: "0 0 20px 2px rgba(255, 255, 255, 0.8)",
      }}
    >
      <div className="absolute top-1/2 left-1/2 w-20 h-[1px] bg-linear-to-r from-white to-transparent -translate-y-1/2 origin-left -rotate-[30deg]" />
    </motion.div>
  );
};

const StarBackground = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 5000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 5000], [0, -400]);
  const y3 = useTransform(scrollY, [0, 5000], [0, -600]);

  const [layers, setLayers] = useState<{ id: number; stars: any[] }[]>([]);

  useEffect(() => {
    const starColors = ["bg-white", "bg-purple-light/60", "bg-blue-light/60"];
    const generateLayer = (count: number, layerId: number) => ({
      id: layerId,
      stars: Array.from({ length: count }).map((_, i) => ({
        id: i,
        size: Math.random() * 2.5 + 0.5,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 2 + Math.random() * 4,
        delay: Math.random() * 10,
        opacity: 0.4 + Math.random() * 0.6, // Increased brightness
        color: starColors[Math.floor(Math.random() * starColors.length)],
      })),
    });

    setLayers([
      generateLayer(100, 1),
      generateLayer(80, 2),
      generateLayer(70, 3),
    ]);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <ShootingStar />
      {[y1, y2, y3].map((yTransform, idx) => (
        <motion.div
          key={idx}
          style={{ y: yTransform }}
          className="absolute inset-[-10%] w-[120%] h-[120%]"
        >
          {layers[idx]?.stars.map((star) => (
            <motion.div
              key={star.id}
              className={`absolute rounded-full ${star.color}`}
              style={{
                width: star.size,
                height: star.size,
                left: star.left,
                top: star.top,
              }}
              animate={{
                opacity: [0, star.opacity, 0],
                scale: [1, 1.2, 1],
                x: [0, (idx + 1) * 5, 0],
                y: [0, (idx + 1) * 3, 0],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
};

const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="inline-block mb-8 w-full max-w-md mx-auto">
      <div className="bg-accent-red/10 border border-accent-red/20 rounded-2xl p-6 relative overflow-hidden shadow-2xl shadow-accent-red/5">
        {/* Subtle background glow */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent-red/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent-red/30" />
            <span className="text-[10px] font-black text-accent-red uppercase tracking-[0.25em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-accent-red rounded-full animate-pulse" />
              Sua oferta expira em
            </span>
            <div className="h-px w-8 bg-accent-red/30" />
          </div>
          
          <div className="flex items-center justify-center gap-4">
            <div className="flex flex-col items-center">
              <div className="bg-accent-red rounded-xl w-16 h-16 flex items-center justify-center font-mono text-3xl font-black text-white shadow-xl shadow-accent-red/40 border-b-4 border-black/20">
                {minutes.toString().padStart(2, '0')}
              </div>
              <span className="text-[10px] font-black uppercase mt-2 text-white/90 tracking-widest">Min</span>
            </div>
            
            <div className="text-4xl font-black text-accent-red/50 animate-pulse pb-6">:</div>
            
            <div className="flex flex-col items-center">
              <div className="bg-accent-red rounded-xl w-16 h-16 flex items-center justify-center font-mono text-3xl font-black text-white shadow-xl shadow-accent-red/40 border-b-4 border-black/20">
                {seconds.toString().padStart(2, '0')}
              </div>
              <span className="text-[10px] font-black uppercase mt-2 text-white/90 tracking-widest">Seg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FadeIn = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number; key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10% 0px" }}
    transition={{ duration: 0.7, delay, ease: [0.215, 0.61, 0.355, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Badge = () => (
  <div className="inline-flex items-center gap-2 bg-purple-primary/10 border border-night-border rounded-full px-4 py-1.5 text-[13px] font-medium text-purple-light uppercase tracking-wider">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green"></span>
    </span>
    Método comprovado · Sem remédios
  </div>
);

const MoonDecoration = () => (
  <div className="relative w-40 h-40 mx-auto mb-6 group">
    {/* Atmospheric rings */}
    <motion.div 
      className="absolute inset-[-10px] rounded-full border border-purple-primary/20"
      animate={{ scale: [1, 1.05, 1], opacity: [0.8, 0.3, 0.8] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    <div className="absolute inset-[-30px] rounded-full border border-purple-primary/10" />
    
    {/* The Moon */}
    <motion.div 
      className="w-full h-full rounded-full bg-radial-[at_40%_40%] from-[#e8d5ff] via-purple-primary to-[#1e0a4a] relative z-10 shadow-[0_0_40px_rgba(124,58,237,0.6),_inset_-20px_-10px_40px_rgba(0,0,0,0.5)]"
      animate={{ y: [0, -12, 0], rotate: [-3, 3, -3] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

/**
 * ── MAIN APP ──
 */

export default function App() {
  const [isStickyClicked, setIsStickyClicked] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const { scrollY } = useScroll();

  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setShowSticky(latest > 600);
    });
  }, [scrollY]);

  const scrollToOffer = () => {
    setIsStickyClicked(true);
    const el = document.getElementById("oferta");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen">
      <StarBackground />

      {/* Sticky Bar */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            id="stickyBar"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-night-bg/95 backdrop-blur-xl border-t border-night-border p-4 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto rounded-t-2xl shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="text-center sm:text-left">
              <strong className="block text-sm sm:text-base leading-tight">Desligue Sua Mente em 7 Minutos</strong>
              <span className="text-xs sm:text-sm text-purple-light font-medium italic">De <span className="line-through text-white/50 font-bold decoration-accent-red">R$ 97,90</span> por <span className="text-white font-bold underline decoration-accent-green">R$ 47,90</span> <span className="bg-accent-green text-black px-1.5 rounded-sm not-italic font-black text-[9px] ml-1">51% OFF</span></span>
            </div>
            <motion.button 
              onClick={scrollToOffer}
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 10px 30px rgba(245,158,11,0.3)",
                  "0 10px 50px rgba(245,158,11,0.6)",
                  "0 10px 30px rgba(245,158,11,0.3)"
                ]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-10 py-3.5 bg-cta-hot rounded-full font-black text-white text-sm sm:text-base uppercase tracking-tight shadow-xl transition-all relative overflow-hidden group"
            >
              <div className="slant-shine" />
              <span className="relative z-10">Desligue para despertar →</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative pt-24 pb-16 overflow-hidden bg-radial-[at_50%_0%] from-purple-dim/40 to-transparent">
        <div className="container max-w-[720px] mx-auto px-5 text-center flex flex-col items-center gap-8">
          <FadeIn>
            <Badge />
          </FadeIn>

          <FadeIn delay={0.1}>
            <MoonDecoration />
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="font-serif flex flex-col items-center">
              <span className="text-5xl sm:text-6xl md:text-8xl font-black leading-tight text-white mb-2">
                Desligue sua mente em <span className="text-gradient-purple-blue">7 minutos</span>
              </span>
              <span className="text-xl sm:text-3xl font-medium text-white tracking-tight max-w-2xl leading-snug">
                Mesmo com pensamentos acelerados antes de dormir
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-purple-light text-lg sm:text-xl max-w-xl font-light leading-relaxed">
              Sem remédios viciantes ou meditações impossíveis. Use o <strong className="text-white font-medium italic underline decoration-purple-secondary underline-offset-4">Interruptor Biológico</strong> da calma diretamente da sua cama. Existe um jeito simples de desligar sua mente antes de dormir (sem remédios).
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-col items-center gap-2">
              <button 
                onClick={scrollToOffer}
                className="group relative px-12 py-5 bg-cta-hot rounded-full font-bold text-xl text-white shadow-[0_8px_40px_rgba(245,158,11,0.4)] hover:shadow-[0_8px_55px_rgba(245,158,11,0.6)] transition-all animate-pulse hover:animate-none"
              >
                🌙 Quero dormir melhor hoje
              </button>
              <span className="text-xs text-night-muted">Acesso imediato · Garantia de 7 dias</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.5} className="mt-4">
            <div className="flex items-center gap-4 text-sm text-night-muted">
              <div className="flex -space-x-3">
                {[..."😴🌙✨💤"].map((emoji, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-night-card border-2 border-night-bg flex items-center justify-center text-lg shadow-sm">
                    {emoji}
                  </div>
                ))}
              </div>
              <p>Mais de <strong className="text-white">3.000 pessoas</strong> já aplicaram</p>
            </div>
          </FadeIn>
        </div>
      </header>

      {/* IDENTIFICATION SECTION */}
      <section className="py-24 relative bg-linear-to-b from-transparent via-night-card to-transparent">
        <div className="container max-w-[720px] mx-auto px-5 text-center">
          <FadeIn>
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-purple-light mb-3">Isso soa familiar?</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-10 leading-tight">
              Você vive uma dessas<br /><em className="text-purple-light italic">situações toda noite?</em>
            </h2>
          </FadeIn>

          <div className="space-y-4">
            {[
              { icon: "🌀", title: "Sua mente não para quando você deita?", desc: "Parece que só começa a trabalhar quando você tenta descansar." },
              { icon: "🛏️", title: "Você fica rolando na cama por horas?", desc: "Muda de posição, olha o celular, e o sono simplesmente não vem." },
              { icon: "🔁", title: "Pensamentos repetitivos te dominam à noite?", desc: "Aquela conversa, aquela preocupação, aquela tarefa — em loop infinito." },
              { icon: "😰", title: "Sente uma ansiedade sem motivo claro?", desc: "Uma tensão no peito que aparece exatamente quando você deveria relaxar." },
            ].map((item, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div className="flex items-start gap-4 bg-white/5 border border-night-border rounded-2xl p-6 text-left hover:bg-purple-primary/10 transition-colors group">
                  <span className="text-3xl flex-shrink-0 grayscale group-hover:grayscale-0 transition-all">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-night-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PAIN AMPLIFICATION */}
      <section className="py-24">
        <div className="container max-w-[720px] mx-auto px-5 text-center">
          <FadeIn>
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-purple-light mb-3">O que isso está custando pra você</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4 leading-tight">
              Cada noite ruim tem um <em className="text-purple-light italic">preço invisível</em>
            </h2>
            <p className="text-purple-light max-w-sm mx-auto mb-10 text-sm italic">
              Não é "só cansaço". É a sua vida passando em modo automático enquanto você sobrevive ao dia.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: <Coffee className="w-8 h-8 text-accent-red" />, title: "Cansaço ao acordar", desc: "Você dorme horas e ainda acorda exausto. Como se não tivesse dormido nada." },
              { icon: <TrendingUp className="w-8 h-8 text-accent-orange" />, title: "Irritação crescente", desc: "Pequenas coisas te tiram do sério. Sua paciência vai embora junto com o sono." },
              { icon: <AlertCircle className="w-8 h-8 text-purple-light" />, title: "Ansiedade acumulada", desc: "Cada noite ruim alimenta mais preocupação — um ciclo que parece não ter fim." },
              { icon: <Brain className="w-8 h-8 text-blue-light" />, title: "Falta de controle", desc: "Você sente que não consegue nem controlar sua própria cabeça." },
            ].map((item, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div className="bg-linear-to-br from-accent-red/5 to-purple-primary/5 border border-accent-red/20 rounded-2xl p-7 text-center h-full hover:-translate-y-1 transition-transform">
                  <div className="mb-4 flex justify-center">{item.icon}</div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-xs text-night-muted leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* BELIEF BREAK */}
      <section className="py-24 relative overflow-hidden bg-linear-to-br from-purple-dim/30 to-blue-primary/20 border-y border-night-border">
        <div className="container max-w-[720px] mx-auto px-5 text-center relative z-10">
          <FadeIn>
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-purple-light mb-4">A verdade que ninguém te contou</p>
            <blockquote className="font-serif text-3xl sm:text-4xl italic font-bold mb-8 leading-tight">
              "Isso não é <span className="bg-linear-to-br from-accent-orange to-accent-red bg-clip-text text-transparent italic">falta de sono</span>…<br />
              é excesso de pensamento."
            </blockquote>
            <p className="text-night-muted text-base sm:text-lg max-w-lg mx-auto font-light leading-relaxed">
              O problema não é o sono — é que sua mente nunca recebe o sinal de que é hora de parar. O que você precisa não é de remédio. É de um <strong className="text-white font-medium underline decoration-purple-primary underline-offset-4">interruptor mental</strong>.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* METHOD SECTION */}
      <section className="py-24">
        <div className="container max-w-[720px] mx-auto px-5 text-center">
          <FadeIn>
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-purple-light mb-3">A solução</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-10 leading-tight">
              Conheça o método que<br /><em className="text-purple-light italic">reprograma sua mente</em> em 7 minutos
            </h2>
          </FadeIn>

          <FadeIn>
            <div className="relative group bg-linear-to-br from-purple-primary/10 to-blue-primary/10 border border-night-border rounded-3xl p-8 sm:p-12 overflow-hidden hover:border-purple-primary/40 transition-all">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-primary/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="font-serif text-8xl font-black mb-2 text-gradient-purple-blue leading-none">7'</div>
              <h3 className="text-2xl font-bold mb-4">O Protocolo dos 7 Minutos</h3>
              <p className="text-night-muted text-sm sm:text-base leading-relaxed mb-8">
                Uma sequência guiada de ações simples que comunicam ao seu cérebro: <em className="text-white">"está tudo bem, pode desligar agora"</em>.
              </p>
              
              <div className="space-y-4 text-left max-w-md mx-auto">
                {[
                  "Pode ser feito deitado na sua cama, agora à noite",
                  "Não precisa de experiência ou meditação",
                  "Funciona mesmo nos dias de mais estresse",
                  "Sem aplicativos, áudios ou acessórios extras",
                  "Resultados na primeira noite de aplicação"
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-linear-to-br from-purple-primary to-blue-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm sm:text-base font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24 bg-night-bg-alt">
        <div className="container max-w-[720px] mx-auto px-5 text-center">
          <FadeIn>
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-purple-light mb-3">O que você vai conquistar</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-12 leading-tight">
              A <em className="text-purple-light italic">liberdade</em> de uma mente<br />que obedece você
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            {[
              { icon: "😴", title: "Dormir mais rápido", desc: "Sem ficar rolando na cama esperando o sono chegar." },
              { icon: "🧘", title: "Reduzir a ansiedade", desc: "Aquela tensão noturna começa a ceder suavemente." },
              { icon: "☀️", title: "Acordar com energia", desc: "Manhãs mais leves, cabeça mais descansada e lúcida." },
              { icon: "🧠", title: "Controle da mente", desc: "Você decide quando pensar — e principalmente quando parar." },
              { icon: "💆", title: "Relaxamento real", desc: "Não só a sensação superficial — mas um descanso reparador." },
              { icon: "🌙", title: "Rotina que funciona", desc: "Ações simples que blindam o resto da sua noite." },
            ].map((benefit, i) => (
              <FadeIn key={i} delay={0.05 * i}>
                <div className="bg-white/5 border border-night-border rounded-2xl p-6 h-full flex flex-col items-center text-center hover:scale-[1.02] transition-transform">
                  <span className="text-4xl mb-4">{benefit.icon}</span>
                  <h4 className="font-bold text-sm mb-2">{benefit.title}</h4>
                  <p className="text-[10px] sm:text-xs text-night-muted leading-tight">{benefit.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24">
        <div className="container max-w-[720px] mx-auto px-5 text-center">
          <FadeIn>
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-purple-light mb-3">Quem já aplicou</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-12 leading-tight">
              Eles duvidaram.<br /><em className="text-purple-light italic">Depois dormiram.</em>
            </h2>
          </FadeIn>

          <div className="space-y-6">
            {[
              { name: "Camila R.", role: "São Paulo, SP · Professora", text: "Eu demorava horas pra dormir, toda noite. Ficava pensando em tudo ao mesmo tempo. Comecei a aplicar o método e em poucos dias já senti uma diferença enorme. Agora adormeço quase instantaneamente.", avatar: "👩" },
              { name: "Rafael M.", role: "Belo Horizonte, MG · Engenheiro", text: "Fui cético no começo, parecia simples demais. Mas na primeira noite eu notei que minha cabeça ficou mais quieta. Na terceira noite já não me acordei ansioso às 3h da manhã.", avatar: "👨" },
              { name: "Juliana S.", role: "Curitiba, PR · Enfermeira", text: "Sofria muito com ansiedade à noite. Tentei aplicativos, podcasts, tudo. O Protocolo de 7 Minutos foi o único que realmente funcionou pra mim. É prático e funciona mesmo quando o dia foi difícil.", avatar: "👩" },
            ].map((testi, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div className="relative bg-white/5 border border-night-border rounded-3xl p-8 text-left group overflow-hidden">
                  <div className="absolute top-4 right-8 font-serif text-7xl text-purple-primary/10 select-none group-hover:text-purple-primary/20 transition-colors">"</div>
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-accent-orange text-accent-orange" />)}
                  </div>
                  <p className="italic text-lg mb-6 leading-relaxed text-white/90">"{testi.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-dim to-blue-primary flex items-center justify-center text-xl shadow-inner">
                      {testi.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-sm">{testi.name}</div>
                      <div className="text-xs text-night-muted">{testi.role}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PROTOCOL TIMELINE */}
      <section className="py-24 bg-night-bg-alt">
        <div className="container max-w-[720px] mx-auto px-5 text-center">
          <FadeIn>
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-purple-light mb-3">Como acontece</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-12 leading-tight">
              O que esperar em<br /><em className="text-purple-light italic">cada noite</em>
            </h2>
          </FadeIn>

          <div className="relative max-w-sm mx-auto pl-8 text-left">
            <div className="absolute left-0 top-4 bottom-4 w-1 bg-linear-to-b from-purple-primary via-blue-primary to-transparent" />
            
            {[
              { day: 1, label: "Primeira noite", result: "Seu cérebro recebe o sinal de 'segurança' inicial. O ruído mental reduz 40%." },
              { day: 3, label: "Terceira noite", result: "A ansiedade residual é drenada. Seu corpo entra em modo de reparação profunda." },
              { day: 5, label: "Quinta noite", result: "O 'Interruptor' se torna automático. Você apaga antes de perceber que tentou." },
              { day: 7, label: "Sétima noite", result: "Recalibração total. Você acorda com a mente limpa e energia renovada." },
            ].map((step, i) => (
              <FadeIn key={i} delay={0.15 * i}>
                <div className="relative mb-12 last:mb-0">
                  <div className="absolute -left-[45px] top-0 w-12 h-12 rounded-full bg-linear-to-br from-purple-primary to-blue-primary shadow-lg shadow-purple-primary/30 flex flex-col items-center justify-center text-white font-bold leading-none z-10">
                    <span className="text-[10px] uppercase font-light opacity-80">Dia</span>
                    <span className="text-lg">{step.day}</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-xs uppercase tracking-wider font-semibold text-purple-light">{step.label}</span>
                    <p className="mt-1 font-medium leading-normal">{step.result}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: PRICE ANCHORING / COMPARISON */}
      <section className="py-24 border-y border-white/5">
        <div className="container max-w-[720px] mx-auto px-5 text-center">
          <FadeIn>
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-purple-light mb-3">Pense bem</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-10 leading-tight">
              Quanto vale uma <em>vida sem exaustão?</em>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 opacity-60">
                <div className="text-xs font-bold mb-2 uppercase">1 Ano de Café/Energéticos</div>
                <div className="text-2xl font-serif text-accent-red strike font-bold">+ R$ 1.200</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 opacity-60">
                <div className="text-xs font-bold mb-2 uppercase">Remédios para Dormir</div>
                <div className="text-2xl font-serif text-accent-red font-bold">+ R$ 650/ano</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 opacity-60">
                <div className="text-xs font-bold mb-2 uppercase">Sessões de Terapia</div>
                <div className="text-2xl font-serif text-accent-red font-bold">+ R$ 180/h</div>
              </div>
            </div>

            <p className="text-xl text-white font-light italic">
              "O custo de uma mente que não desliga é a sua <span className="text-accent-orange font-bold">saúde, felicidade e carreira</span>."
            </p>
          </FadeIn>
        </div>
      </section>

      {/* OBJECTIONS */}
      <section className="py-24">
        <div className="container max-w-[720px] mx-auto px-5 text-center">
          <FadeIn>
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-purple-light mb-3">Respondendo dúvidas</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-12 leading-tight">
              Sua mente está tentando te <em className="text-purple-light italic">sabotar?</em>
            </h2>
          </FadeIn>

          <div className="space-y-4">
            {[
              { icon: "💊", title: "Não precisa de remédios", desc: "O método é 100% natural. Nenhuma substância, nenhum efeito colateral." },
              { icon: "📚", title: "Sem experiência prévia", desc: "Nunca meditou? Sem problema. O método é guiado passo a passo, para qualquer pessoa." },
              { icon: "⚡", title: "Eficácia na simplicidade", desc: "Simples não significa fraco. Às vezes o que a mente precisa é de algo simples que ela não resista." },
              { icon: "⏰", title: "Sua nova realidade", desc: "Em apenas 7 minutos você terá o domínio completo sobre o seu descanso." },
            ].map((faq, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div className="bg-accent-green/5 border border-accent-green/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left text-white/90">
                  <span className="text-3xl flex-shrink-0">{faq.icon}</span>
                  <div>
                    <h5 className="font-bold text-sm mb-1">{faq.title}</h5>
                    <p className="text-xs text-night-muted leading-relaxed">{faq.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* DETAILED FAQ */}
      <section className="py-24 border-t border-white/5 bg-night-bg-alt">
        <div className="container max-w-[720px] mx-auto px-5">
          <FadeIn className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold mb-4">Perguntas Frequentes</h2>
            <p className="text-night-muted text-sm italic">Tire suas últimas dúvidas técnicas sobre o acesso.</p>
          </FadeIn>

          <div className="space-y-6">
            {[
              { q: "Como recebo o acesso ao método?", a: "Imediatamente. Após a confirmação do pagamento, você receberá um e-mail com seus dados de acesso exclusivos para a nossa plataforma segura." },
              { q: "E se eu não conseguir me concentrar nas técnicas?", a: "O método foi desenhado justamente para mentes que não param. Você não precisa de 'foco absoluto', as ações são simples o suficiente para que seu cérebro subconsciente responda aos estímulos de relaxamento." },
              { q: "O acesso é vitalício?", a: "Sim. Você paga uma única vez e o método é seu para sempre. Pode usar todas as noites, pelo tempo que desejar." },
              { q: "O material é em vídeo ou texto?", a: "Você terá acesso a um Guia Prático Digital (Web e PDF) otimizado para visualização noturna (Dark Mode), para que a luz do celular não atrapalhe sua produção de melatonina enquanto você aprende os passos." },
              { q: "Funciona para quem trabalha em turnos (noite)?", a: "Com certeza. O 'Interruptor Biológico' funciona independente do horário. Ele prepara seu sistema nervoso para o desligamento imediato, seja às 22h ou às 6h da manhã." }
            ].map((item, i) => (
              <FadeIn key={i} delay={0.05 * i}>
                <div className="border-b border-white/10 pb-6 group">
                  <h4 className="text-white font-bold text-base mb-2 group-hover:text-purple-light transition-colors flex items-center gap-2">
                    <span className="text-purple-primary text-lg">?</span> {item.q}
                  </h4>
                  <p className="text-night-muted text-sm leading-relaxed">{item.a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* OFFER SECTION */}
      <section id="oferta" className="scroll-mt-24 py-24 bg-linear-to-br from-purple-dim/40 to-blue-primary/30 border-y border-night-border relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-[at_50%_0%] from-purple-primary/10 to-transparent pointer-events-none" />
        
        <div className="container max-w-[720px] mx-auto px-5 text-center relative z-10">
          <FadeIn>
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-purple-light mb-3">Escassez de Oportunidade</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-10 leading-tight">
              Recupere a única coisa que<br /><em className="text-purple-light italic">dinheiro nenhum compra</em>
            </h2>
          </FadeIn>

          <FadeIn>
            <div className="bg-night-bg border-4 border-purple-primary rounded-3xl p-8 sm:p-12 glow-purple relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <ShieldCheck className="w-8 h-8 text-purple-light opacity-20" />
              </div>
              
              <CountdownTimer timeLeft={timeLeft} />

              <div className="inline-flex items-center gap-2 bg-accent-red/20 border border-accent-red/30 rounded-full py-1 px-4 mb-6">
                <div className="w-2 h-2 bg-accent-red rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-accent-red uppercase tracking-widest">
                  {timeLeft > 0 ? `Atenção: Apenas 12 vagas com bônus restantes` : `OFERTA ENCERRANDO...`}
                </span>
              </div>
              
              <p className="text-xs font-bold text-night-muted uppercase tracking-widest mb-4">Acesso Completo ao Método</p>
              
              <div className="font-serif flex flex-col items-center justify-center mb-6">
                <span className="text-white/40 text-xl sm:text-2xl line-through mb-1 decoration-accent-red decoration-2">De R$ 97,90</span>
                <div className="text-7xl sm:text-8xl font-black flex items-start text-white">
                  <span className="text-2xl mt-4 mr-1">R$</span>
                  <span>47</span>
                  <span className="text-3xl mt-4">,90</span>
                </div>
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [1, 0.8, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ fontFamily: 'Arial, sans-serif' }}
                  className="bg-accent-green text-black text-[10px] font-black py-1.5 px-5 rounded-full mt-4 uppercase tracking-[0.1em] shadow-lg shadow-accent-green/30 border border-black/10"
                >
                  Economize R$ 50,00 Hoje
                </motion.div>
              </div>

              <div className="bg-accent-orange/10 border border-accent-orange/20 rounded-xl py-2 px-4 mb-8 inline-block">
                <span className="text-[10px] font-bold text-accent-orange uppercase tracking-tighter">
                  {timeLeft > 300 ? "⚠️ Oferta por tempo limitado: Inclui 2 Bônus Exclusivos" : "🔥 CORRA! OS BÔNUS PODEM EXPIRAR A QUALQUER MOMENTO"}
                </span>
              </div>
              
              <p className="text-night-muted text-sm mb-10 max-w-sm mx-auto">
                Recupere suas noites por menos de R$ 1,60 por dia!
              </p>

              <div className="space-y-4 text-left max-w-[320px] mx-auto mb-10">
                {[
                  { text: "Protocolo Completo 7 Minutos", val: "R$ 97,00" },
                  { text: "BÔNUS 1: O Guia 'Acordar Blindado'", val: "GRÁTIS" },
                  { text: "BÔNUS 2: Checklist 'Quarto do Sono'", val: "GRÁTIS" },
                  { text: "Acesso Vitalício + Atualizações", val: "INCLUSO" },
                  { text: "Garantia Blindada de 7 Dias", val: "SEGURO" }
                ].map((inc, i) => (
                  <div key={i} className="flex items-center justify-between gap-3 border-b border-white/5 pb-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent-green" />
                      <span className={`text-[13px] ${inc.val === "GRÁTIS" ? "text-accent-orange font-bold" : "font-medium"}`}>{inc.text}</span>
                    </div>
                    <span className="text-[10px] text-night-muted font-mono">{inc.val}</span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-linear-to-br from-accent-orange to-accent-red py-6 rounded-2xl font-bold text-xl text-white shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 slant" />
                {timeLeft > 300 ? "🌟 SIM! QUERO DORMIR MELHOR HOJE" : "🔥 ÚLTIMA CHANCE! GARANTA O SEU!"}
              </button>
              
              <p className="mt-6 text-[10px] text-night-muted">
                Pagamento seguro · Acesso imediato · Garantia de satisfação
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="py-24">
        <div className="container max-w-[720px] mx-auto px-5 text-center">
          <FadeIn>
            <div className="bg-white/5 border border-accent-green/30 rounded-3xl p-8 sm:p-12 relative flex flex-col items-center">
              <div className="mb-6"><ShieldCheck className="w-16 h-16 text-accent-green" /></div>
              <h3 className="font-serif text-2xl font-bold mb-4">Garantia Incondicional de 7 Dias</h3>
              <p className="text-night-muted text-sm leading-relaxed max-w-lg mb-4">
                Aplique o método por 7 minutos. Se não sentir nenhuma diferença — ou se simplesmente não gostar por qualquer motivo — devolveremos 100% do seu dinheiro. Sem burocracia.
              </p>
              <strong className="text-white text-lg font-bold">O risco é todo nosso.</strong>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 text-center bg-radial-[at_50%_100%] from-purple-dim/40 to-transparent">
        <div className="container max-w-[720px] mx-auto px-5">
          <FadeIn>
            <div className="w-16 h-0.5 bg-linear-to-r from-transparent via-purple-primary to-transparent mx-auto mb-10" />
            
            <h2 className="font-serif text-3xl sm:text-5xl font-black leading-tight mb-6">
              Comece hoje a dormir melhor<br />
              e recuperar o <em className="text-gradient-purple-blue not-italic">controle<br />da sua mente</em>
            </h2>

            <p className="text-purple-light text-sm sm:text-base mb-10 max-w-lg mx-auto italic">
              Você não precisa mais lutar contra sua própria cabeça toda noite.<br />
              7 minutos podem mudar o seu sono — e a sua vida — para sempre.
            </p>

            <motion.button 
              onClick={scrollToOffer}
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 20px 40px rgba(245,158,11,0.2)",
                  "0 20px 70px rgba(245,158,11,0.5)",
                  "0 20px 40px rgba(245,158,11,0.2)"
                ]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-cta-hot rounded-full font-black text-xl text-white shadow-2xl transition-all mb-4 relative overflow-hidden group"
            >
              <div className="slant-shine" />
              <span className="relative z-10">🌙 Quero dormir em 7 minutos</span>
            </motion.button>
            <p className="text-sm text-night-muted font-medium mb-4">
              De <span className="line-through decoration-accent-red">R$ 97,90</span> por <span className="text-white font-bold">R$ 47,90</span> (51% OFF) · Acesso imediato
            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-60">
              {[
                { icon: <Lock className="w-5 h-5" />, text: "Pagamento seguro" },
                { icon: <Zap className="w-5 h-5" />, text: "Acesso imediato" },
                { icon: <ShieldCheck className="w-5 h-5" />, text: "Garantia 7 dias" },
                { icon: <Moon className="w-5 h-5" />, text: "Funciona no celular" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="text-purple-light">{item.icon}</div>
                  <span className="text-[10px] uppercase tracking-wider">{item.text}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 border-t border-white/5 bg-night-bg/50">
        <div className="container max-w-[720px] mx-auto px-5 text-center opacity-50">
          <p className="text-[10px] mb-4">© 2026 Desligue Sua Mente em 7 Minutos · Todos os direitos reservados</p>
          <p className="text-[10px] leading-relaxed mb-6">
            Este produto não é um tratamento médico e não substitui acompanhamento profissional de saúde.
            Os resultados podem variar de pessoa para pessoa.
          </p>
          <div className="flex justify-center gap-6 text-[10px]">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Suporte</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
