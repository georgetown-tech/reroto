import { Plan } from "@prisma/client";

export const testimonials = [{
    testimonial: "The easiest piece of newspaper software that I have ever interacted with.",
    reviewer: "Lucas Raskin"
}]

export const plans = {
    [Plan.none]: {
      articles: 5,
      users: 3,
    },
    [Plan.highschool]: {
      articles: 10000,
      users: 20,
    },
    [Plan.college]: {
      articles: 100000,
      users: 100,
    },
    [Plan.professional]: {
      articles: 250000,
      users: 150,
    },
    [Plan.enterprise]: {
      articles: 999999999,
      users: 999999,
    },
  };