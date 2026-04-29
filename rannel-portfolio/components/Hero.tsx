"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import BookCallModal from "./BookCallModal";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="bg-[var(--color-bg-main)] py-40 md:py-48">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-serif text-[var(--color-text-heading)] text-5xl md:text-7xl lg:text-8xl font-semibold leading-tight mb-8 max-w-5xl"
          >
            AI-Speed Development. Enterprise-Grade Security.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="font-sans text-[var(--color-text-body)] text-lg md:text-xl mb-12 max-w-2xl"
          >
            Hi, I&apos;m Jenel Esteron. I build fast MVPs for startups and manually secure them.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex gap-4 flex-wrap"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="bg-[#B84A39] text-white px-8 py-3.5 rounded-none"
            >
              Book a Discovery Call
            </motion.button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="#projects" className="border border-[#B84A39] text-[#B84A39] px-8 py-3.5 rounded-none inline-block">
                View the Vault
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <BookCallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
