"use client";

import React from "react";
import { Mail, MessageCircle } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="py-12 bg-[#010104] text-white text-center">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Contact</h2>
        <p className="mb-8 text-gray-300">
          Vous pouvez me contacter par email ou WhatsApp pour toute demande.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          {/* Email */}
          <a
            href="mailto:phanuel.alibia@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            <Mail className="w-4 h-4" /> Email
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/237696603305"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
