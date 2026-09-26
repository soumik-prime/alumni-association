import type { Profile } from "./profile";

// Static placeholder example. Replace with an API response later —
// the Profile component only depends on this shape, not this file.
export const exampleProfile: Profile = {
  id: "prf_10245",
  reg_no: "2019331045",
  name: "Farhana Akter Meem",
  batch: 4,
  session: "2019–20",
  graduation_year: 2024,
  photo: "/placeholder.webp",
  bio: "Backend-leaning full-stack engineer working on distributed systems for fintech. Outside of work I mentor NEU CSE juniors for ICPC and write about database internals.",
  gender: "F",
  blood_group: "B+",

  email: "farhana.meem@example.com",
  facebook: "https://facebook.com/farhana.meem",
  github: "https://github.com/farhana-meem",
  linkedin: "https://linkedin.com/in/farhana-meem",
  google_scholar: "https://scholar.google.com/citations?user=fmeem2024",
  portfolio: "https://farhanameem.dev",

  present_address: {
    id: "addr_1",
    city: "Dhaka",
    country: { iso2: "BD", name: "Bangladesh", flag: "🇧🇩" },
  },
  permanent_address: {
    id: "addr_2",
    city: "Netrokona",
    country: { iso2: "BD", name: "Bangladesh", flag: "🇧🇩" },
  },

  ssc_institution: {
    id: "inst_ssc_1",
    name: "Netrokona Government Girls' High School",
  },
  hsc_institution: {
    id: "inst_hsc_1",
    name: "Netrokona Government College",
  },

  visible: true,
  created_at: "2024-03-11T09:20:00.000Z",
  updated_at: "2026-08-02T14:05:00.000Z",

  higher_studies: [
    {
      id: "hs_1",
      institution: {
        id: "inst_ms_1",
        name: "University of Dhaka",
        website: "https://du.ac.bd",
      },
      degree: "MSc",
      field: "Computer Science",
      graduation_year: 2026,
    },
  ],

  work_experiences: [
    {
      id: "we_1",
      company: {
        id: "co_1",
        name: "Brightlane Systems",
        industry: "Fintech",
        website: "https://brightlanesystems.example",
      },
      career_field: "Backend Engineering",
      title: "Software Engineer II",
      employment_type: "Full-time",
      start_date: "2025-02-01",
      // no end_date -> current
    },
    {
      id: "we_2",
      company: {
        id: "co_2",
        name: "Devnest Labs",
        industry: "Software",
        website: "https://devnestlabs.example",
      },
      career_field: "Full-Stack Development",
      title: "Software Engineer",
      employment_type: "Full-time",
      start_date: "2024-04-01",
      end_date: "2025-01-20",
    },
    {
      id: "we_3",
      company: {
        id: "co_3",
        name: "NEU CSE Research Lab",
        industry: "Research & Academia",
      },
      career_field: "Systems Research",
      title: "Undergraduate Research Assistant",
      employment_type: "Research Assistantship",
      start_date: "2022-09-01",
      end_date: "2023-12-15",
    },
  ],

  publications: [
    {
      id: "pub_1",
      title:
        "Adaptive Sharding for Low-Latency Transaction Processing in Regional Fintech Systems",
      abstract:
        "We propose an adaptive sharding strategy that reduces cross-shard transaction latency by dynamically re-partitioning hot keys based on observed access patterns, evaluated on a simulated regional payments workload.",
      type: "CONFERENCE",
      venue: "International Conference on Distributed Computing Systems (ICDCS)",
      doi: "10.1109/icdcs.2026.0451",
      external_url: "https://doi.org/10.1109/icdcs.2026.0451",
      published_year: 2026,
      status: "PUBLISHED",
      authors: [
        { student_id: "2019331045", name: "Farhana Akter Meem" },
        { name: "Dr. Tahmina Rahman" },
      ],
    },
    {
      id: "pub_2",
      title:
        "A Comparative Study of Consistency Models for Edge-Deployed Caching Layers",
      abstract:
        "This paper surveys consistency trade-offs across five caching strategies commonly deployed at the edge, and proposes a lightweight benchmark harness for reproducing the comparison.",
      type: "JOURNAL",
      venue: "Journal of Systems and Software Engineering",
      published_year: 2025,
      status: "UNDER_REVIEW",
      authors: [
        { student_id: "2019331045", name: "Farhana Akter Meem" },
        { name: "Md. Shahriar Kabir" },
        { name: "Dr. Tahmina Rahman" },
      ],
    },
    {
      id: "pub_3",
      title:
        "Graph-Based Route Optimization for Cost-Constrained Inter-District Logistics",
      type: "THESIS",
      venue: "Dept. of CSE, Netrokona University",
      published_year: 2024,
      status: "PUBLISHED",
      authors: [{ student_id: "2019331045", name: "Farhana Akter Meem" }],
    },
  ],
};
