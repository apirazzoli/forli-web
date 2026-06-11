import es from "../data/site-content.json";
import en from "../data/site-content.en.json";

export default function getContent(locale) {
  return locale === "en" ? en : es;
}
