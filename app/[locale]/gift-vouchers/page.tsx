import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { client } from "@/sanity/lib/client";
import { giftVouchersQuery, giftVouchersPageQuery } from "@/sanity/lib/queries";
import type { GiftVoucherData, GiftVouchersPageData } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import Navigation from "@/components/Navigation";
import FooterWrapper from "@/components/FooterWrapper";
import BackToHome from "@/components/BackToHome";
import VideoBlock from "@/components/VideoBlock";
import VoucherOrderForm, { type VoucherDesign } from "@/components/VoucherOrderForm";

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

  const vouchers = sanityVouchers && sanityVouchers.length > 0 ? sanityVouchers : null;

  const eyebrow  = pageContent?.eyebrow  ?? t("eyebrow");
  const heading  = pageContent?.heading  ?? t("heading");
  const intro    = pageContent?.intro    ?? t("intro");

  // Gift card designs — image + name only (no pricing)
  const designs: VoucherDesign[] = (vouchers ?? []).map((v) => ({
    id: v._id,
    label: v.label ?? "",
    imageUrl: v.coverImage ? urlFor(v.coverImage).width(480).height(720).fit("crop").url() : null,
  }));

  const formLabels = {
    nameLabel:            t("nameLabel"),
    namePlaceholder:      t("namePlaceholder"),
    emailLabel:           t("emailLabel"),
    emailPlaceholder:     t("emailPlaceholder"),
    recipientLabel:       t("recipientLabel"),
    recipientPlaceholder: t("recipientPlaceholder"),
    amountLabel:          t("amountLabel"),
    amountPlaceholder:    t("amountPlaceholder"),
    selectDesign:         t("selectDesign"),
    selectContact:        t("selectContact"),
    instagramOption:      t("instagramOption"),
    emailOption:          t("emailOption"),
    instagramPlaceholder: t("instagramPlaceholder"),
    termsAgree:           t("termsAgree"),
    terms:                t("terms"),
    send:                 t("send"),
    sending:              t("sending"),
    required:             t("required"),
    successHeading:       t("successHeading"),
    successBody:          t("successBody"),
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
          <h1 className="text-title text-[#221c14] mb-6">
            {heading}
          </h1>
          <p className="text-body text-[#221c14] max-w-[560px]">
            {intro}
          </p>
        </div>

        {/* Optional video — managed in Studio */}
        <VideoBlock
          video={pageContent?.video}
          eyebrow={pageContent?.videoEyebrow}
          heading={pageContent?.videoHeading}
          body={pageContent?.videoBody}
          label={pageContent?.videoLabel}
        />

        {/* Design gallery — images + names only, no pricing */}
        {designs.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px] bg-[#221c14] border-b-2 border-[#221c14]">
            {designs.map((d) => (
              <div key={d.id} className="bg-[#e5e4d2] flex flex-col">
                <div className="aspect-[2/3] relative border-b-2 border-[#221c14] overflow-hidden">
                  {d.imageUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={d.imageUrl}
                      alt={d.label}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#221c14]/5" />
                  )}
                </div>
                <div className="px-5 md:px-8 py-5">
                  <p className="text-[#221c14] font-bold text-[16px]">{d.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order form */}
        <div className="border-b-2 border-[#221c14]">
          <div className="border-b-2 border-[#221c14] px-5 md:px-10 py-10">
            <p className="text-[#221c14]/50 font-bold text-[15px] tracking-[3px] uppercase">
              {t("orderFormHeading")}
            </p>
          </div>
          <VoucherOrderForm designs={designs} labels={formLabels} />
        </div>

      </main>
      <FooterWrapper />
    </>
  );
}
