"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ARTISTS = [
  {
    name: "Lukas",
    title: "Tattoo Artist & Printmaker",
    bio: "I understand art as a skill that must be perfected every day. Tattoos and linocuts are my forms of expression — full of detail, movement, and action. I love to observe life in the city, my surroundings, and draw attention to the small details that make up the whole.",
    instagram: "https://instagram.com",
    handle: "@lukastattoo",
    photo: "/assets/publikacija_profile PNG.webp",
  },
  {
    name: "Artiomas",
    title: "Tattoo Artist",
    bio: "Inspired by the strange and the beautiful. My work blends illustrative storytelling with fine-line precision — cats, creatures, dark botanicals and everything in between.",
    instagram: "https://instagram.com",
    handle: "@scarycatboo",
    photo: null,
  },
];

export default function Artists() {
  return (
    <section id="about" className="border-b-2 border-[#221c14]" style={{ backgroundColor: "#e5e4d2" }}>

      {/* Section header */}
      <div className="border-b-2 border-[#221c14] px-5 md:px-10 py-10">
        <p className="text-[#221c14]/50 font-bold text-[13px] tracking-[3px] uppercase mb-2">The Team</p>
        <h2
          className="text-[#221c14] font-extrabold leading-[1.1em]"
          style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
        >
          Meet the artists
        </h2>
      </div>

      {/* Artist grid */}
      <div className="grid md:grid-cols-2">
        {ARTISTS.map((artist, i) => (
          <motion.div
            key={artist.name}
            className={`border-b-2 md:border-b-0 border-[#221c14] ${i === 0 ? "md:border-r-2" : ""}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
          >
            {/* Portrait */}
            <div className="aspect-[3/4] relative overflow-hidden border-b-2 border-[#221c14] bg-[#d5d4c2]">
              {artist.photo ? (
                <Image
                  src={artist.photo}
                  alt={artist.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-end p-6">
                  <span className="text-[#221c14]/20 font-extrabold" style={{ fontSize: "8rem", lineHeight: 1 }}>
                    {artist.name[0]}
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="px-5 md:px-10 py-10">
              <h3
                className="text-[#221c14] font-extrabold leading-[1.1em] mb-1"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
              >
                {artist.name}
              </h3>
              <p className="text-[#221c14]/60 font-bold text-[13px] tracking-[2px] uppercase mb-6">
                {artist.title}
              </p>
              <p className="text-[#221c14] font-bold text-[17px] leading-[1.65em] mb-6 max-w-[480px]">
                {artist.bio}
              </p>
              <a
                href={artist.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#221c14] font-bold text-[14px] tracking-[2px] uppercase border-b-2 border-[#221c14] pb-1 hover:opacity-50 transition-opacity"
              >
                Instagram <span className="text-[#221c14]/50">{artist.handle}</span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
