import { localeString, localeText, localeBlock } from "./locale";
import {
  sectionText,
  sectionImage,
  sectionGallery,
  sectionVideo,
  sectionQuote,
  sectionMediaText,
  localeSections,
} from "./articleContent";
import hero from "./hero";
import service from "./service";
import portfolioItem from "./portfolioItem";
import studioVideo from "./studioVideo";
import about from "./about";
import siteSettings from "./siteSettings";
import review from "./review";
import bookingRequest from "./bookingRequest";
import giftVoucher from "./giftVoucher";
import voucherOrder from "./voucherOrder";
import artist from "./artist";
import videoSection from "./videoSection";
import bookPage from "./bookPage";
import giftVouchersPage from "./giftVouchersPage";
import termsPage from "./termsPage";
import cookiePage from "./cookiePage";
import featuredPost from "./featuredPost";
import announcementBar from "./announcementBar";
import newsPost from "./newsPost";

export const schemaTypes = [
  // Shared locale types (must be registered for field references to work)
  localeString,
  localeText,
  localeBlock,

  // Blog content sections (used by the blog body)
  sectionText,
  sectionImage,
  sectionGallery,
  sectionVideo,
  sectionQuote,
  sectionMediaText,
  localeSections,

  // Singletons
  announcementBar,
  hero,
  siteSettings,
  videoSection,
  featuredPost,
  bookPage,
  giftVouchersPage,
  about,
  termsPage,
  cookiePage,

  // Collections
  newsPost,
  service,
  portfolioItem,
  studioVideo,
  review,
  bookingRequest,
  giftVoucher,
  voucherOrder,
  artist,
];
