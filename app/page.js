"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  ChevronLeft,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Asset paths (using public directory approach for better NextJS compatibility)
const heroComposite = "/assets/hero_composite.png";
// Removed unused variable: aviationBackground
// const platformIconAviation = "/assets/platform_icon_aviation.png";
const platformIconYacht = "/assets/platform_icon_yacht.png";
const platformIconVehicle = "/assets/platform_icon_vehicle.png";
// const platformIconDefense = "/assets/platform_icon_defense.png";
const coachairShield = "/assets/coachair-shield.png";
// Removed unused variables: phoenixLogo, coachairFullLogo
const coachairShieldBadge = "/assets/coachair-shield-badge.png";
// Removed unused variable: coachairGoldenLogo
const coachairGoldenTransparent = "/assets/coachair-golden-transparent.png";
const jacobBaumlerPhoto = "/assets/JacobBaumler.JPG";
const heatherBaumlerPhoto = "/assets/HeatherBaumler.webp";
const tomGroomPhoto = "/assets/TomGroom.webp";

export default function HomePage() {
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatbotView, setChatbotView] = useState("questions"); // 'questions' or 'answer'
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Live metrics with animated counters
  const [metrics, _setMetrics] = useState({
    flights: 2847,
    onTimeRate: 98.7,
    availableJets: 156,
    availableYachts: 89,
    availableVehicles: 234,
  });

  // Animated counter hook
  const useCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [end, duration]);

    return count;
  };

  const flightCount = useCounter(metrics.flights);
  const jetCount = useCounter(metrics.availableJets);
  const yachtCount = useCounter(metrics.availableYachts);
  const vehicleCount = useCounter(metrics.availableVehicles);

  // Typewriter animation hook
  const useTypewriter = (text, speed = 50) => {
    const [displayText, setDisplayText] = useState("");
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
      if (!text) return;

      setDisplayText("");
      setIsComplete(false);
      let i = 0;

      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 2));
          i++;
        } else {
          setIsComplete(true);
          clearInterval(timer);
        }
      }, speed);

      return () => clearInterval(timer);
    }, [text, speed]);

    return { displayText, isComplete };
  };

  // Predefined answers for chatbot questions
  const chatbotAnswers = {
    "How does CoachAir eliminate illegal charters?":
      "CoachAir uses advanced AI verification to ensure all aircraft operators have proper certifications, insurance, and regulatory compliance. Our platform cross-references multiple databases in real-time to verify legitimacy and prevent illegal charter operations from accessing our network.",
    "What are the partnership opportunities?":
      "We offer white-label solutions for FBOs, charter operators, and aviation service providers. Partners can integrate our AI platform into their existing operations, expand their service offerings, and access our network of verified operators while maintaining their brand identity.",
    "Tell me about white-label solutions":
      "Our white-label platform allows partners to offer CoachAir's aviation intelligence under their own brand. This includes custom branding, integrated booking systems, concierge services, and access to our verified network of aircraft and operators.",
  };

  // Get current answer text for typewriter animation
  const currentAnswerText = selectedQuestion
    ? chatbotAnswers[selectedQuestion]
    : "";
  const { displayText: typewriterText, isComplete: typewriterComplete } =
    useTypewriter(chatbotView === "answer" ? currentAnswerText : "", 10);

  return (
    <>
      {/* Floating AI Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <button
          type="button"
          onClick={() => setShowAIChat(!showAIChat)}
          className="theme-primary p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 group"
          title="Chat with CoachAir AI"
        >
          <Bot size={24} className="group-hover:animate-pulse" />
        </button>

        {/* AI Chat Tooltip */}
        <AnimatePresence>
          {showAIChat && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              className="absolute bottom-0 right-16 theme-chat-bg border theme-border rounded-xl p-4 w-80 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Bot size={20} className="theme-primary-text" />
                  <span className="font-semibold hero-description-text">
                    CoachAir AI Assistant
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAIChat(false)}
                  className="theme-muted-text hover:theme-fg transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="hero-description-text text-sm mb-4">
                Get instant answers about CoachAir's aviation intelligence
                platform, pricing, partnerships, and more.
              </p>

              {chatbotView === "questions"
                ? <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedQuestion(
                          "How does CoachAir eliminate illegal charters?",
                        );
                        setChatbotView("answer");
                      }}
                      className="w-full text-left theme-secondary hover:theme-muted border theme-border rounded-lg p-3 text-sm theme-fg transition-all duration-300"
                    >
                      "How does CoachAir eliminate illegal charters?"
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedQuestion(
                          "What are the partnership opportunities?",
                        );
                        setChatbotView("answer");
                      }}
                      className="w-full text-left theme-secondary hover:theme-muted border theme-border rounded-lg p-3 text-sm theme-fg transition-all duration-300"
                    >
                      "What are the partnership opportunities?"
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedQuestion(
                          "Tell me about white-label solutions",
                        );
                        setChatbotView("answer");
                      }}
                      className="w-full text-left theme-secondary hover:theme-muted border theme-border rounded-lg p-3 text-sm theme-fg transition-all duration-300"
                    >
                      "Tell me about white-label solutions"
                    </button>
                  </div>
                : <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <button
                        type="button"
                        onClick={() => {
                          setChatbotView("questions");
                          setSelectedQuestion(null);
                        }}
                        className="hero-description-text hover:theme-fg transition-colors p-1 rounded"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <span className="text-sm font-medium hero-description-text">
                        {selectedQuestion}
                      </span>
                    </div>
                    <div className="theme-secondary border theme-border rounded-lg p-4 min-h-[120px]">
                      <p className="text-sm theme-fg leading-relaxed">
                        {typewriterText}
                        {!typewriterComplete && (
                          <span className="animate-pulse">|</span>
                        )}
                      </p>
                    </div>
                  </div>}
              <div className="mt-4 pt-3 border-t theme-border">
                <Link
                  href="https://calendly.com/jacob-baumler-gocoachair/1hour"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center theme-primary font-semibold px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm"
                >
                  <MessageCircle size={16} className="mr-2" />
                  Schedule a Call
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroComposite})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <h1 className="mt-24 text-5xl md:text-7xl font-bold leading-tight theme-fg">
              <span className="theme-primary-text">CoachAir</span>
              <br />
              <span className="theme-primary-text">Aviation Intelligence</span>
              <br />
              <span className="text-3xl md:text-4xl theme-accent">
                Infrastructure as a Service - AI for General Aviation
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed theme-hero-fg max-w-4xl mx-auto">
              Beyond private jets. Beyond simple booking. CoachAir is the
              world's first Aviation Intelligence Infrastructure — unifying
              private aviation, urban air mobility, medvac, yachts, vehicles,
              hotels, high end events and defense with patent-pending AI that
              eliminates illegal charters, automates FAA compliance, and secures
              every transaction with escrow protection.
            </p>

            <p className="text-lg md:text-xl leading-relaxed theme-hero-fg max-w-4xl mx-auto">
              CoachAir Aviation Intelligence is making it so brokers, operators,
              and FBOs have the tools to elevate passengers' booking process
              with a private labeled mobile app so they can search, book, and
              fly in under 60 seconds!
            </p>

            <p className="text-xl md:text-2xl font-semibold theme-primary-text mt-8">
              Built for Compliance. Designed for Scale. Powered with
              Intelligence.
            </p>

            {/* Large Golden CoachAir Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-12 mb-8"
            >
              <Image
                src={coachairGoldenTransparent}
                alt="CoachAir Aviation Intelligence"
                width={299}
                height={448}
                className="w-auto aspect-[299/448] mx-auto"
              />
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://calendly.com/jacob-baumler-gocoachair/1hour"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-primary font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Schedule a Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              {/* <Link
                href="https://www.canva.com/design/DAGtiPc1dP0/bZc68s7R_4V_6yZkMwTcwg/view?utm_content=DAGtiPc1dP0&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hcef55243d2"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-outline-button font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                View Investor Deck
              </Link> */}
            </div>
          </motion.div>

          {/* Live Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 pb-8"
          >
            <div className="theme-card backdrop-blur-lg border theme-border rounded-xl p-6 text-center">
              <div className="text-4xl font-bold theme-primary-text">
                {flightCount.toLocaleString()}
              </div>
              <div className="theme-muted-text">Flights Today</div>
            </div>
            <div className="theme-card backdrop-blur-lg border theme-border rounded-xl p-6 text-center">
              <div className="text-4xl font-bold theme-primary-text">
                {metrics.onTimeRate}%
              </div>
              <div className="theme-muted-text">On-Time Rate</div>
            </div>
            <div className="theme-card backdrop-blur-lg border theme-border rounded-xl p-6 text-center">
              <div className="text-4xl font-bold theme-primary-text">
                {jetCount}
              </div>
              <div className="theme-muted-text">Available Jets</div>
            </div>
            <div className="theme-card backdrop-blur-lg border theme-border rounded-xl p-6 text-center">
              <div className="text-4xl font-bold theme-primary-text">
                {yachtCount + vehicleCount}
              </div>
              <div className="theme-muted-text">Fleet Assets</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="platform"
        className="py-20 px-4 md:px-8 lg:px-16 theme-secondary"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold leading-tight theme-fg">
              Infrastructure as a Service for Aviation Professionals
            </h2>
            <p className="text-lg md:text-xl leading-relaxed theme-muted-text max-w-4xl mx-auto">
              CoachAir is building the first-ever Aviation Intelligence
              Infrastructure — a unified, scalable platform designed to
              modernize and connect every part of the aviation ecosystem, from
              charter brokers and operators to FBOs, medevac teams, and defense
              applications. We're eliminating the fragmentation that has held
              the industry back for decades.
            </p>

            <p className="text-lg md:text-xl leading-relaxed theme-primary-text max-w-4xl mx-auto mt-6 font-semibold">
              Revenue for brokers, operators, FBOs, medevac, and DOD extends
              beyond flights. With CoachAir powering your operations, you now
              have multiple revenue streams all white-labeled (private labeled)
              so your passengers can experience VIP service across all verticals
              under your brand.
            </p>

            <h3 className="text-2xl md:text-3xl font-semibold leading-tight theme-fg mt-12">
              Key Platform Benefits:
            </h3>
            <ul className="text-lg md:text-xl leading-relaxed theme-muted-text max-w-4xl mx-auto text-left list-disc list-inside space-y-2">
              <li>FAA-compliant operations across all verticals</li>
              <li>Escrow-secured booking and payments for every service</li>
              <li>AI-powered dispatch + compliance automation</li>
              <li>White-labeled tools for brokers, operators, and FBOs</li>
              <li>Fraud prevention and data accuracy across all platforms</li>
              <li>Built for Urban Air Mobility and global expansion</li>
            </ul>

            {/* Client-Specific Value Props */}
            <div className="grid md:grid-cols-5 gap-6 mt-12">
              <div className="theme-card border theme-border rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 backdrop-blur-sm text-center">
                <div className="w-12 h-12 theme-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-sm">BR</span>
                </div>
                <h3 className="text-xl font-bold theme-fg mb-2">Brokers</h3>
                <p className="theme-muted-text text-sm">
                  AI-powered quote automation, compliance verification, and
                  client management tools. Expand revenue with white-labeled
                  yachts, luxury vehicles, hotels, and events under your brand.
                </p>
              </div>

              <div className="theme-card border theme-border rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 backdrop-blur-sm text-center">
                <div className="w-12 h-12 theme-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-sm">OP</span>
                </div>
                <h3 className="text-xl font-bold theme-fg mb-2">Operators</h3>
                <p className="theme-muted-text text-sm">
                  Real-time compliance monitoring, pilot scheduling, and fleet
                  optimization. Diversify revenue with white-labeled maritime,
                  ground transport, and hospitality services.
                </p>
              </div>

              <div className="theme-card border theme-border rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 backdrop-blur-sm text-center">
                <div className="w-12 h-12 theme-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-sm">FBO</span>
                </div>
                <h3 className="text-xl font-bold theme-fg mb-2">FBOs</h3>
                <p className="theme-muted-text text-sm">
                  Integrated fuel, hangar, and service coordination with
                  real-time availability. Expand offerings with white-labeled
                  concierge, luxury transport, and event services.
                </p>
              </div>

              <div className="theme-card border theme-border rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 backdrop-blur-sm text-center">
                <div className="w-12 h-12 theme-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-sm">MED</span>
                </div>
                <h3 className="text-xl font-bold theme-fg mb-2">Medevac</h3>
                <p className="theme-muted-text text-sm">
                  Mission-critical dispatch with real-time medical equipment
                  tracking and crew certification. Extend services with
                  white-labeled ground medical transport and logistics.
                </p>
              </div>

              <div className="theme-card border theme-border rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 backdrop-blur-sm text-center">
                <div className="w-12 h-12 theme-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-sm">DOD</span>
                </div>
                <h3 className="text-xl font-bold theme-fg mb-2">Defense</h3>
                <p className="theme-muted-text text-sm">
                  Secure, NDA-protected operations with classified mission
                  support and enhanced security protocols. Expand capabilities
                  with white-labeled secure transport and logistics.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platform Capabilities */}
      <section
        id="capabilities"
        className="py-20 px-4 md:px-8 lg:px-16 theme-bg"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold leading-tight theme-fg">
              Future Platform Capabilities
            </h2>
            <p className="text-lg md:text-xl leading-relaxed theme-muted-text max-w-4xl mx-auto">
              Comprehensive AI-powered solutions across multiple transportation
              and hospitality verticals
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {/* <div className="theme-card border theme-border rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 backdrop-blur-sm text-center">
                <Image
                  src={platformIconAviation}
                  alt="Aviation AI"
                  className="h-16 w-16 mx-auto mb-4"
                  width={64}
                  height={64}
                />
                <h3 className="text-2xl md:text-3xl font-semibold leading-tight mb-4 theme-fg">
                  Aviation AI
                </h3>
                <p className="theme-muted-text">
                  Real-time flight optimization, compliance monitoring, and
                  dispatch automation for private jets, helicopters, and medevac
                  operations.
                </p>
              </div>

              <div className="theme-card border theme-border rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 backdrop-blur-sm text-center">
                <Image
                  src={platformIconDefense}
                  alt="Defense/Medevac Ops"
                  className="h-16 w-16 mx-auto mb-4"
                  width={64}
                  height={64}
                />
                <h3 className="text-2xl md:text-3xl font-semibold leading-tight mb-4 theme-fg">
                  Defense/Medevac Ops
                </h3>
                <p className="theme-muted-text">
                  Mission-critical dispatch and coordination for government,
                  defense, and emergency medical transportation with
                  NDA-protected protocols.
                </p>
              </div> */}

              <div className="theme-card border theme-border rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 backdrop-blur-sm text-center">
                <Image
                  src={platformIconVehicle}
                  alt="Luxury Vehicle Dispatch"
                  className="h-16 w-16 mx-auto mb-4"
                  width={64}
                  height={64}
                />
                <h3 className="text-2xl md:text-3xl font-semibold leading-tight mb-4 theme-fg">
                  Luxury Vehicle Dispatch
                </h3>
                <p className="theme-muted-text">
                  Premium vehicle fleet management with real-time tracking,
                  route optimization, and white-glove service coordination.
                </p>
              </div>

              <div className="theme-card border theme-border rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 backdrop-blur-sm text-center">
                <Image
                  src={platformIconYacht}
                  alt="Yachting AI"
                  className="h-16 w-16 mx-auto mb-4"
                  width={64}
                  height={64}
                />
                <h3 className="text-2xl md:text-3xl font-semibold leading-tight mb-4 theme-fg">
                  Yachting AI
                </h3>
                <p className="theme-muted-text">
                  Luxury yacht charter coordination with port management,
                  weather routing, and concierge services integration.
                </p>
              </div>

              <div className="theme-card border theme-border rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 backdrop-blur-sm text-center">
                <Image
                  src={coachairShieldBadge}
                  alt="Events & Hospitality AI"
                  className="h-16 w-16 mx-auto mb-4"
                  width={64}
                  height={64}
                />
                <h3 className="text-2xl md:text-3xl font-semibold leading-tight mb-4 theme-fg">
                  Events & Hospitality AI
                </h3>
                <p className="theme-muted-text">
                  Seamless coordination of luxury events, hotel bookings, and
                  hospitality services with integrated concierge support.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Proud Member of Section */}
      <section
        id="memberships"
        className="py-20 px-4 md:px-8 lg:px-16 theme-secondary"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold leading-tight theme-fg">
              Team Member Affiliations
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <Link
                href="http://eliances.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-fg hover:theme-primary-text transition-colors duration-300 font-medium"
              >
                Eliances
              </Link>
              <Link
                href="https://www.aopa.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-fg hover:theme-primary-text transition-colors duration-300 font-medium"
              >
                AOPA
              </Link>
              <Link
                href="https://www.eaa.org/eaa"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-fg hover:theme-primary-text transition-colors duration-300 font-medium"
              >
                EAA
              </Link>
              <Link
                href="https://flyingovertime.org/mission/"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-fg hover:theme-primary-text transition-colors duration-300 font-medium"
              >
                FOT
              </Link>
              <Link
                href="https://www.mbaa-mn.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-fg hover:theme-primary-text transition-colors duration-300 font-medium"
              >
                MBAA
              </Link>
              <Link
                href="https://mnpilots.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-fg hover:theme-primary-text transition-colors duration-300 font-medium"
              >
                MNPA
              </Link>
              <Link
                href="https://naa.aero/"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-fg hover:theme-primary-text transition-colors duration-300 font-medium"
              >
                NAA
              </Link>
              <Link
                href="https://nata.aero/about/"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-fg hover:theme-primary-text transition-colors duration-300 font-medium"
              >
                NATA
              </Link>
              <Link
                href="https://nbaa.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-fg hover:theme-primary-text transition-colors duration-300 font-medium"
              >
                NBAA
              </Link>
              <Link
                href="https://www.linkedin.com/groups/14530021/"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-fg hover:theme-primary-text transition-colors duration-300 font-medium"
              >
                TCAN
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-4 md:px-8 lg:px-16 theme-bg">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold leading-tight theme-fg">
              Meet the CoachAir Team
            </h2>
            <p className="text-lg md:text-xl leading-relaxed theme-muted-text max-w-4xl mx-auto">
              Our leadership team brings decades of experience in aviation,
              technology, and business development.
            </p>

            <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8 mt-12">
              {/* Jacob L. Baumler */}
              <Link
                href="https://www.linkedin.com/in/jacoblbaumler/"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-card theme-border rounded-xl p-6 shadow-lg backdrop-blur-sm text-center hover:shadow-2xl transition-all duration-500 hover:scale-105 block"
              >
                <Image
                  src={jacobBaumlerPhoto}
                  alt="Jacob L. Baumler"
                  className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"
                  width={128}
                  height={128}
                />
                <h3 className="text-xl font-bold theme-fg mb-1">
                  Jacob L. Baumler
                </h3>
                <p className="theme-primary-text mb-2">Founder & CEO</p>
                <p className="theme-muted-text text-sm">
                  Serial Entrepreneur, Scalable Growth, Strategic Partnerships,
                  Private Aviation, Emerging Technology, Market Disruption.
                </p>
              </Link>

              {/* Heather Baumler */}
              <Link
                href="https://www.linkedin.com/in/heather-n-baumler-460a9b7a/"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-card theme-border rounded-xl p-6 shadow-lg backdrop-blur-sm text-center hover:shadow-2xl transition-all duration-500 hover:scale-105 block"
              >
                <Image
                  src={heatherBaumlerPhoto}
                  alt="Heather Baumler"
                  className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"
                  width={128}
                  height={128}
                />
                <h3 className="text-xl font-bold theme-fg mb-1">
                  Heather Baumler
                </h3>
                <p className="theme-primary-text mb-2">Owner</p>
                <p className="theme-muted-text text-sm">
                  20 yrs in Customer Experience, Marketing, & Business
                  Development.
                </p>
              </Link>

              {/* Tom Groom */}
              <Link
                href="https://www.linkedin.com/in/tomgroom/"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-card theme-border rounded-xl p-6 shadow-lg backdrop-blur-sm text-center hover:shadow-2xl transition-all duration-500 hover:scale-105 block"
              >
                <Image
                  src={tomGroomPhoto}
                  alt="Tom Groom"
                  className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"
                  width={128}
                  height={128}
                />
                <h3 className="text-xl font-bold theme-fg mb-1">Tom Groom</h3>
                <p className="theme-primary-text mb-2">COO</p>
                <p className="theme-muted-text text-sm">
                  38 yrs in Technology Leadership, Brand Strategy, Market
                  Expansion, Federal Affairs.
                </p>
              </Link>

              {/* Amie Mayo */}
              {/* <Link
                href="https://www.linkedin.com/in/amiemayo/"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-card theme-border rounded-xl p-6 shadow-lg backdrop-blur-sm text-center hover:shadow-2xl transition-all duration-500 hover:scale-105 block"
              >
                <Image
                  src={amieMayoPhoto}
                  alt="Amie Mayo"
                  className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"
                  width={128}
                  height={128}
                />
                <h3 className="text-xl font-bold theme-fg mb-1">Amie Mayo</h3>
                <p className="theme-primary-text mb-2">CMO</p>
                <p className="theme-muted-text text-sm">
                  20 yrs in Marketing, Brand, Business Development, Data-Driven
                  Strategy, MarTech Solutions, Growth Optimization, Industry
                  Innovation.
                </p>
              </Link> */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partnership Opportunities */}
      <section className="py-20 px-4 md:px-8 lg:px-16 theme-secondary">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold leading-tight theme-fg">
              Partnership Opportunities
            </h2>
            <p className="text-lg md:text-xl leading-relaxed theme-muted-text max-w-4xl mx-auto">
              We're currently offering Alpha, Beta, and Full-Rollout partnership
              opportunities, including:
            </p>
            <ul className="text-lg md:text-xl leading-relaxed theme-muted-text max-w-4xl mx-auto text-left list-disc list-inside space-y-2">
              <li>Preferred onboarding</li>
              <li>Implementation support</li>
              <li>Early access to full-stack tools</li>
              <li>
                Letter of Intent (LOI) templates to secure your role as a
                founding customer or partner
              </li>
            </ul>
            <p className="text-lg md:text-xl leading-relaxed theme-muted-text max-w-4xl mx-auto">
              This is your opportunity to help build a smarter, safer, and more
              connected future for aviation. We'd love to learn more about your
              business and how we can support your goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* For Investors Section */}
      <section id="investors" className="py-20 px-4 md:px-8 lg:px-16 theme-bg">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold leading-tight theme-fg">
              For Investors
            </h2>
            <p className="text-lg md:text-xl leading-relaxed theme-muted-text max-w-4xl mx-auto">
              Our SAFE round is nearing completion. CoachAir is engineered for
              scale.
            </p>
            <h3 className="text-2xl md:text-3xl font-semibold leading-tight theme-fg mt-12">
              We're backed by:
            </h3>
            <ul className="text-lg md:text-xl leading-relaxed theme-muted-text max-w-4xl mx-auto text-left list-disc list-inside space-y-2">
              <li>$600K in founder capital</li>
              <li>Signed LOIs for our Alpha release</li>
              <li>
                IP protections and early traction across key aviation sectors
              </li>
            </ul>
            <p className="text-lg md:text-xl leading-relaxed theme-muted-text max-w-4xl mx-auto">
              If you're exploring early-stage opportunities in aviation tech,
              this is your chance to invest in the infrastructure backbone the
              industry has been missing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link
                href="https://share-na2.hsforms.com/190W3q2DtQHeheL4PIQIscA40l7ov"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-primary theme-primary-text font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Engage Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              {/* <Link
                href="https://www.canva.com/design/DAGtiPc1dP0/bZc68s7R_4V_6yZkMwTcwg/view?utm_content=DAGtiPc1dP0&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hcef55243d2"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 theme-border theme-primary-text font-semibold px-8 py-4 rounded-lg hover:theme-primary hover:theme-primary-text transition-all duration-300"
              >
                View Full Investor Deck
              </Link>
              <Link
                href="https://www.canva.com/design/DAGup29jENo/XvB75qCsSPO4pUyAVRl8_Q/view?utm_content=DAGup29jENo&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h17406cd711"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 theme-border theme-primary-text font-semibold px-8 py-4 rounded-lg hover:theme-primary hover:theme-primary-text transition-all duration-300"
              >
                View 1 Page Investor Summary
              </Link> */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Customer Summary Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 theme-secondary">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold leading-tight theme-fg">
              CoachAir Customer Summary
            </h2>
            <p className="text-lg md:text-xl leading-relaxed theme-muted-text max-w-4xl mx-auto">
              View our 1-page customer summary to understand how CoachAir can
              transform your operations.
            </p>
            <div className="flex justify-center mt-8">
              <Link
                href="https://share-na2.hsforms.com/190W3q2DtQHeheL4PIQIscA40l7ov"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-primary theme-primary-text font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Request Customer Summary
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stay Connected Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 theme-bg">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold leading-tight theme-fg">
              Stay Connected
            </h2>
            <p className="text-lg md:text-xl leading-relaxed theme-muted-text max-w-4xl mx-auto">
              Let's build the aviation future together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link
                href="https://www.linkedin.com/company/coachairai/"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-primary theme-primary-text font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Follow us on LinkedIn
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/newsletters/7351363309914238978/"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 theme-border theme-primary-text font-semibold px-8 py-4 rounded-lg hover:theme-primary hover:theme-primary-text transition-all duration-300"
              >
                Subscribe to our Newsletter
              </Link>
              <Link
                href="https://calendly.com/jacob-baumler-gocoachair/1hour"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 theme-border theme-primary-text font-semibold px-8 py-4 rounded-lg hover:theme-primary hover:theme-primary-text transition-all duration-300"
              >
                Book a Meeting
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="theme-bg py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Image
                  src={coachairShield}
                  alt="CoachAir"
                  className="h-10 w-10"
                  width={40}
                  height={40}
                />
                <span className="text-xl font-bold theme-fg">CoachAir</span>
              </div>
              <p className="theme-muted-text">Aviation Intelligence Platform</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold theme-fg">Platform</h3>
              <div className="space-y-2">
                <Link
                  href="#platform"
                  className="block theme-muted-text hover:theme-primary-text transition-colors duration-300"
                >
                  Aviation AI
                </Link>
                <Link
                  href="#platform"
                  className="block theme-muted-text hover:theme-primary-text transition-colors duration-300"
                >
                  Defense Solutions
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold theme-fg">Company</h3>
              <div className="space-y-2">
                <Link
                  href="https://share-na2.hsforms.com/190W3q2DtQHeheL4PIQIscA40l7ov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block theme-muted-text hover:theme-primary-text transition-colors duration-300"
                >
                  Contact Us
                </Link>
                <Link
                  href="#team"
                  className="block theme-muted-text hover:theme-primary-text transition-colors duration-300"
                >
                  Meet the Team
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold theme-fg">Contact</h3>
              <div className="space-y-2">
                <p className="theme-muted-text">
                  Jacob L. Baumler, Founder & CEO
                </p>
                <p className="theme-muted-text">320-287-0021</p>
                <p className="theme-muted-text">jacob.baumler@gocoachair.com</p>
                <Link
                  href="https://www.gocoachair.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="theme-primary-text hover:theme-primary transition-colors duration-300"
                >
                  www.gocoachair.com
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t theme-border mt-12 pt-8 text-center">
            <p className="theme-muted-text">
              © 2025 CoachAir Aviation Intelligence. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
