"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const coachairShieldBadge = "/assets/coachair-shield-badge.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 theme-nav border-b theme-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Image
                src={coachairShieldBadge}
                alt="CoachAir Aviation Intelligence"
                width={56}
                height={56}
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/#platform"
              className="theme-fg hover:theme-primary-text transition-colors duration-300 font-medium"
            >
              Platform
            </Link>
            <Link
              href="/#capabilities"
              className="theme-fg hover:theme-primary-text transition-colors duration-300 font-medium"
            >
              Capabilities
            </Link>
            <Link
              href="/#team"
              className="theme-fg hover:theme-primary-text transition-colors duration-300 font-medium"
            >
              Team
            </Link>
            <Link
              href="/#investors"
              className="theme-fg hover:theme-primary-text transition-colors duration-300 font-medium"
            >
              Investors
            </Link>
            <Link
                href="/learn"
                className="theme-fg hover:theme-primary-text transition-colors duration-300 font-medium"
            >
                Learn
            </Link>
            <Link
              href="https://calendly.com/jacob-baumler-gocoachair/1hour"
              target="_blank"
              rel="noopener noreferrer"
              className="theme-primary font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Schedule Call
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              type="button"
              className="md:hidden p-2 rounded-full theme-button-ghost transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden theme-nav-mobile border-t theme-border"
          >
            <div className="px-4 py-4 space-y-4">
              <Link
                href="/#platform"
                className="block theme-fg hover:theme-primary-text transition-colors duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Platform
              </Link>
              <Link
                href="/#capabilities"
                className="block theme-fg hover:theme-primary-text transition-colors duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Capabilities
              </Link>
              <Link
                href="/#team"
                className="block theme-fg hover:theme-primary-text transition-colors duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Team
              </Link>
              <Link
                href="/#investors"
                className="block theme-fg hover:theme-primary-text transition-colors duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Investors
              </Link>
              <Link
                href="/learn"
                className="block theme-fg hover:theme-primary-text transition-colors duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Learn
              </Link>
              <Link
                href="https://calendly.com/jacob-baumler-gocoachair/1hour"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full theme-primary font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Schedule Call
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
