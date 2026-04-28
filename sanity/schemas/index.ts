import { localeString, localeText, localeBlock } from "./locale";
import hero from "./hero";
import service from "./service";
import portfolioItem from "./portfolioItem";
import studioVideo from "./studioVideo";
import about from "./about";
import siteSettings from "./siteSettings";
import review from "./review";
import bookingRequest from "./bookingRequest";
import giftVoucher from "./giftVoucher";
import artist from "./artist";
import videoSection from "./videoSection";
import bookPage from "./bookPage";
import giftVouchersPage from "./giftVouchersPage";
import termsPage from "./termsPage";

export const schemaTypes = [
  // Shared locale types (must be registered for field references to work)
  localeString,
  localeText,
  localeBlock,

  // Singletons
  hero,
  siteSettings,
  videoSection,
  bookPage,
  giftVouchersPage,
  about,
  termsPage,

  // Collections
  service,
  portfolioItem,
  studioVideo,
  review,
  bookingRequest,
  giftVoucher,
  artist,
];
