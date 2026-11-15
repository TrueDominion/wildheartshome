// Questions and answers. An answer of null hides the question until she writes it.
// Answers here are limited to facts already established: ordering and payment happen on
// Hotplate, and pickup is in Worcester with the address sent on confirmation.
import type { FaqEntry } from "./types";

export const faq: FaqEntry[] = [
  {
    question: "How do I order?",
    answer:
      "Everything is ordered and paid for on Hotplate. Pick your items from the current drop before orders close, then come by during the pickup window.",
  },
  {
    question: "Where do I pick up?",
    answer:
      "Pickup is in Worcester, MA. The exact address is sent with your order confirmation.",
  },
  {
    question: "How do I pay?",
    answer: "You pay on Hotplate when you place your order.",
  },
  {
    question: "What about allergens?",
    answer:
      "Allergens are listed on each item once confirmed. If an item does not list them yet, email me before you order and I'll tell you exactly what's in it.",
  },
  {
    question: "How do I hear about the next drop?",
    answer:
      "Every drop goes up on Hotplate. Follow along on Hotplate so you don't miss the next holiday drop.",
  },
  // TODO(content): she needs to write these answers.
  { question: "Can I cancel or change my order?", answer: null },
  { question: "Do you take custom orders?", answer: null },
  { question: "Can you make something gluten free, dairy free or vegan?", answer: null },
  { question: "What if I miss the pickup window?", answer: null },
];
