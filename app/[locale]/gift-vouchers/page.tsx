import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { client } from "@/sanity/lib/client";
import { giftVouchersQuery, giftVouchersPageQuery } from "@/sanity/lib/queries";
import type { GiftVoucherData, GiftVouchersPageData, SanityImage } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import Navigation from "@/components/Navigation";
import FooterWrapper from "@/components/FooterWrapper";
import BackToHome from "@/components/BackToHome";
import VoucherOrderForm, { type VoucherFormOption } from "@/components/VoucherOrderForm";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Gift Vouchers — Publikacija",
    description: "Give the gift of art. Publikacija gift vouchers are valid for tattoos, prints, and workshops.",
  };
}

export default async function GiftVouchersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [t, pageContent, sanityVouchers] = await Promise.all([
    getTranslations("giftVouchers"),
    client.fetch<GiftVouchersPageData>(giftVouchersPageQuery, { locale }).catch(() => null),
    client.fetch<GiftVoucherData[]>(giftVouchersQuery, { locale }).catch(() => null),
  ]);

  type FallbackVoucher = { amount: string; label: string; description: string; ideal: string[] };
  const fallbackVouchers = t.raw("vouchers") as FallbackVoucher[];
  const vouchers = sanityVouchers && sanityVouchers.length > 0 ? sanityVouchers : null;

  const eyebrow  = pageContent?.eyebrow  ?? t("eyebrow");
  const heading  = pageContent?.heading  ?? t("heading");
  const intro    = pageContent?.intro    ?? t("intro");
  const getVoucherLabel = pageContent?.getVoucherLabel ?? t("getVoucher");

  // Normalised voucher list for the order form
  const formVouchers: VoucherFormOption[] = vouchers
    ? vouchers.map((v) => {
        const raw = parseFloat(String(v.amount).replace(/[^0-9.]/g, ""));
        const cents = isNaN(raw) ? 0 : Math.round(raw * 100);
        const display = isNaN(raw) ? String(v.amount) : `€${raw}`;
        return { id: v._id, label: v.label ?? "", amount: display, amountCents: cents };
      })
    : fallbackVouchers.map((v) => {
        const raw = parseFloat(String(v.amount).replace(/[^0-9.]/g, ""));
        const cents = isNaN(raw) ? 0 : Math.round(raw * 100);
        return { id: v.amount, label: v.label, amount: v.amount, amountCents: cents };
      });

  // Unified card data — same shape for Sanity and fallback paths
  type CardData = { id: string; label: string; amount: string; description: string | null; coverImage: SanityImage | null };
  const cards: CardData[] = vouchers
    ? vouchers.map((v) => {
        const raw = String(v.amount);
        const num = parseFloat(raw.replace(/[^0-9.]/g, ""));
        return {
          id: v._id,
          label: v.label ?? "",
          amount: isNaN(num) ? raw : `€${num}${raw.includes("+") ? "+" : ""}`,
          description: v.description,
          coverImage: v.coverImage,
        };
      })
    : fallbackVouchers.map((v) => ({
        id: v.amount,
        label: v.label,
        amount: v.amount,
        description: v.description,
        coverImage: null as SanityImage | null,
      }));

  const formLabels = {
    selectVoucher:       t("selectVoucher"),
    selectContact:       t("selectContact"),
    instagramOption:     t("instagramOption"),
    emailOption:         t("emailOption"),
    payOnlineOption:     t("payOnlineOption"),
    instagramPlaceholder: t("instagramPlaceholder"),
    send:                t("send"),
    getVoucher:          getVoucherLabel,
    terms:               t("terms"),
  };

  return (
    <>
      <Navigation />
      <main style={{ backgroundColor: "#e5e4d2", paddingTop: "calc(72px + var(--bar-h, 0px))" }}>
        <BackToHome />

        {/* Page header */}
        <div className="border-b-2 border-[#221c14] px-5 md:px-10 py-10 md:py-16">
          <p className="text-[#221c14]/50 font-bold text-[15px] tracking-[3px] uppercase mb-2">
            {eyebrow}
          </p>
          <h1
            className="text-[#221c14] font-extrabold leading-[1.1em] mb-6"
            style={{ fontSize: "clamp(3rem, 5.5vw, 5rem)" }}
          >
            {heading}
          </h1>
          <p className="text-[#221c14] font-bold text-[22px] leading-[1.65em] max-w-[560px]">
            {intro}
          </p>
        </div>

        {/* Voucher showcase
            gap-[2px] + bg-[#221c14]: gives uniform 2px dark lines between all cells
            without using borders on individual cards, so every card has identical
            content width → identical image heights → no crookedness.
            Subgrid (grid-row:span 3 + grid-template-rows:subgrid) aligns label,
            price and description rows perfectly across all columns in the same row. */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-[#221c14] border-b-2 border-[#221c14]">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-[#e5e4d2] flex flex-col md:grid md:[grid-row:span_3] md:[grid-template-rows:subgrid]"
            >
              {/* Row 1: Image — always rendered so all cards have the same image-section height */}
              <div className="aspect-[2/3] relative border-b-2 border-[#221c14] overflow-hidden">
                {card.coverImage ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={urlFor(card.coverImage).width(480).height(720).fit("crop").url()}
                    alt={card.label}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#221c14]/5" />
                )}
              </div>

              {/* Row 2: Label + Price */}
              <div className="px-5 md:px-8 pt-8 pb-4 border-b-2 border-[#221c14]">
                <p className="text-[#221c14]/50 font-bold text-[15px] tracking-[2px] uppercase mb-2">
                  {card.label}
                </p>
                <p
                  className="text-[#221c14] font-extrabold leading-none"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
                >
                  {card.amount}
                </p>
              </div>

              {/* Row 3: Description */}
              <div className="px-5 md:px-8 py-6">
                {card.description && (
                  <p className="text-[#221c14]/60 font-bold text-[17px] leading-[1.6em]">
                    {card.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Order form */}
        <div className="border-b-2 border-[#221c14]">
          <div className="border-b-2 border-[#221c14] px-5 md:px-10 py-10">
            <p className="text-[#221c14]/50 font-bold text-[15px] tracking-[3px] uppercase">
              {t("orderFormHeading")}
            </p>
          </div>
          <VoucherOrderForm vouchers={formVouchers} labels={formLabels} />
        </div>

      </main>
      <FooterWrapper />
    </>
  );
}
