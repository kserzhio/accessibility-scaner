
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.wcagCriterion.upsert({
    where: { id: "1.1.1" },
    update: {},
    create: {
      id: "1.1.1",
      title: "Non-text Content",
      level: "A",
      principle: "PERCEIVABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/1-1-1.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#1-1-1"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "1.2.1" },
    update: {},
    create: {
      id: "1.2.1",
      title: "Audio-only and Video-only (Prerecorded)",
      level: "A",
      principle: "PERCEIVABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/1-2-1.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#1-2-1"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "1.2.2" },
    update: {},
    create: {
      id: "1.2.2",
      title: "Captions (Prerecorded)",
      level: "A",
      principle: "PERCEIVABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/1-2-2.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#1-2-2"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "1.2.3" },
    update: {},
    create: {
      id: "1.2.3",
      title: "Audio Description or Media Alternative (Prerecorded)",
      level: "A",
      principle: "PERCEIVABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/1-2-3.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#1-2-3"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "1.2.4" },
    update: {},
    create: {
      id: "1.2.4",
      title: "Captions (Live)",
      level: "AA",
      principle: "PERCEIVABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/1-2-4.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#1-2-4"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "1.2.5" },
    update: {},
    create: {
      id: "1.2.5",
      title: "Audio Description (Prerecorded)",
      level: "AA",
      principle: "PERCEIVABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/1-2-5.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#1-2-5"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "1.2.6" },
    update: {},
    create: {
      id: "1.2.6",
      title: "Sign Language (Prerecorded)",
      level: "AAA",
      principle: "PERCEIVABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/1-2-6.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#1-2-6"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "1.3.1" },
    update: {},
    create: {
      id: "1.3.1",
      title: "Info and Relationships",
      level: "A",
      principle: "PERCEIVABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/1-3-1.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#1-3-1"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "1.3.2" },
    update: {},
    create: {
      id: "1.3.2",
      title: "Meaningful Sequence",
      level: "A",
      principle: "PERCEIVABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/1-3-2.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#1-3-2"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "1.3.3" },
    update: {},
    create: {
      id: "1.3.3",
      title: "Sensory Characteristics",
      level: "A",
      principle: "PERCEIVABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/1-3-3.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#1-3-3"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "1.4.1" },
    update: {},
    create: {
      id: "1.4.1",
      title: "Use of Color",
      level: "A",
      principle: "PERCEIVABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/1-4-1.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#1-4-1"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "1.4.3" },
    update: {},
    create: {
      id: "1.4.3",
      title: "Contrast (Minimum)",
      level: "AA",
      principle: "PERCEIVABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/1-4-3.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#1-4-3"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "1.4.6" },
    update: {},
    create: {
      id: "1.4.6",
      title: "Contrast (Enhanced)",
      level: "AAA",
      principle: "PERCEIVABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/1-4-6.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#1-4-6"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "1.4.10" },
    update: {},
    create: {
      id: "1.4.10",
      title: "Reflow",
      level: "AA",
      principle: "PERCEIVABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/1-4-10.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#1-4-10"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "1.4.11" },
    update: {},
    create: {
      id: "1.4.11",
      title: "Non-text Contrast",
      level: "AA",
      principle: "PERCEIVABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/1-4-11.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#1-4-11"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "1.4.12" },
    update: {},
    create: {
      id: "1.4.12",
      title: "Text Spacing",
      level: "AA",
      principle: "PERCEIVABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/1-4-12.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#1-4-12"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "1.4.13" },
    update: {},
    create: {
      id: "1.4.13",
      title: "Content on Hover or Focus",
      level: "AA",
      principle: "PERCEIVABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/1-4-13.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#1-4-13"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "2.1.1" },
    update: {},
    create: {
      id: "2.1.1",
      title: "Keyboard",
      level: "A",
      principle: "OPERABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/2-1-1.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#2-1-1"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "2.1.2" },
    update: {},
    create: {
      id: "2.1.2",
      title: "No Keyboard Trap",
      level: "A",
      principle: "OPERABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/2-1-2.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#2-1-2"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "2.1.4" },
    update: {},
    create: {
      id: "2.1.4",
      title: "Character Key Shortcuts",
      level: "A",
      principle: "OPERABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/2-1-4.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#2-1-4"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "2.2.1" },
    update: {},
    create: {
      id: "2.2.1",
      title: "Timing Adjustable",
      level: "A",
      principle: "OPERABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/2-2-1.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#2-2-1"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "2.2.2" },
    update: {},
    create: {
      id: "2.2.2",
      title: "Pause, Stop, Hide",
      level: "A",
      principle: "OPERABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/2-2-2.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#2-2-2"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "2.3.1" },
    update: {},
    create: {
      id: "2.3.1",
      title: "Three Flashes or Below Threshold",
      level: "A",
      principle: "OPERABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/2-3-1.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#2-3-1"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "2.4.1" },
    update: {},
    create: {
      id: "2.4.1",
      title: "Bypass Blocks",
      level: "A",
      principle: "OPERABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/2-4-1.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#2-4-1"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "2.4.2" },
    update: {},
    create: {
      id: "2.4.2",
      title: "Page Titled",
      level: "A",
      principle: "OPERABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/2-4-2.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#2-4-2"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "2.4.3" },
    update: {},
    create: {
      id: "2.4.3",
      title: "Focus Order",
      level: "A",
      principle: "OPERABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/2-4-3.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#2-4-3"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "2.4.4" },
    update: {},
    create: {
      id: "2.4.4",
      title: "Link Purpose (In Context)",
      level: "A",
      principle: "OPERABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/2-4-4.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#2-4-4"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "2.4.5" },
    update: {},
    create: {
      id: "2.4.5",
      title: "Multiple Ways",
      level: "AA",
      principle: "OPERABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/2-4-5.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#2-4-5"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "2.4.6" },
    update: {},
    create: {
      id: "2.4.6",
      title: "Headings and Labels",
      level: "AA",
      principle: "OPERABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/2-4-6.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#2-4-6"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "2.4.7" },
    update: {},
    create: {
      id: "2.4.7",
      title: "Focus Visible",
      level: "AA",
      principle: "OPERABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/2-4-7.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#2-4-7"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "2.5.1" },
    update: {},
    create: {
      id: "2.5.1",
      title: "Pointer Gestures",
      level: "A",
      principle: "OPERABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/2-5-1.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#2-5-1"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "2.5.2" },
    update: {},
    create: {
      id: "2.5.2",
      title: "Pointer Cancellation",
      level: "A",
      principle: "OPERABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/2-5-2.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#2-5-2"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "2.5.3" },
    update: {},
    create: {
      id: "2.5.3",
      title: "Label in Name",
      level: "A",
      principle: "OPERABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/2-5-3.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#2-5-3"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "2.5.4" },
    update: {},
    create: {
      id: "2.5.4",
      title: "Motion Actuation",
      level: "A",
      principle: "OPERABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/2-5-4.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#2-5-4"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "2.5.7" },
    update: {},
    create: {
      id: "2.5.7",
      title: "Dragging Movements",
      level: "AA",
      principle: "OPERABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/2-5-7.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#2-5-7"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "2.5.8" },
    update: {},
    create: {
      id: "2.5.8",
      title: "Target Size (Minimum)",
      level: "AA",
      principle: "OPERABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/2-5-8.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#2-5-8"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "3.1.1" },
    update: {},
    create: {
      id: "3.1.1",
      title: "Language of Page",
      level: "A",
      principle: "UNDERSTANDABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/3-1-1.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#3-1-1"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "3.1.2" },
    update: {},
    create: {
      id: "3.1.2",
      title: "Language of Parts",
      level: "AA",
      principle: "UNDERSTANDABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/3-1-2.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#3-1-2"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "3.2.1" },
    update: {},
    create: {
      id: "3.2.1",
      title: "On Focus",
      level: "A",
      principle: "UNDERSTANDABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/3-2-1.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#3-2-1"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "3.2.2" },
    update: {},
    create: {
      id: "3.2.2",
      title: "On Input",
      level: "A",
      principle: "UNDERSTANDABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/3-2-2.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#3-2-2"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "3.2.3" },
    update: {},
    create: {
      id: "3.2.3",
      title: "Consistent Navigation",
      level: "AA",
      principle: "UNDERSTANDABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/3-2-3.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#3-2-3"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "3.2.4" },
    update: {},
    create: {
      id: "3.2.4",
      title: "Consistent Identification",
      level: "AA",
      principle: "UNDERSTANDABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/3-2-4.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#3-2-4"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "3.3.1" },
    update: {},
    create: {
      id: "3.3.1",
      title: "Error Identification",
      level: "A",
      principle: "UNDERSTANDABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/3-3-1.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#3-3-1"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "3.3.2" },
    update: {},
    create: {
      id: "3.3.2",
      title: "Labels or Instructions",
      level: "A",
      principle: "UNDERSTANDABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/3-3-2.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#3-3-2"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "3.3.3" },
    update: {},
    create: {
      id: "3.3.3",
      title: "Error Suggestion",
      level: "AA",
      principle: "UNDERSTANDABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/3-3-3.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#3-3-3"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "3.3.4" },
    update: {},
    create: {
      id: "3.3.4",
      title: "Error Prevention (Legal, Financial, Data)",
      level: "AA",
      principle: "UNDERSTANDABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/3-3-4.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#3-3-4"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "3.3.7" },
    update: {},
    create: {
      id: "3.3.7",
      title: "Redundant Entry",
      level: "A",
      principle: "UNDERSTANDABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/3-3-7.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#3-3-7"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "3.3.8" },
    update: {},
    create: {
      id: "3.3.8",
      title: "Accessible Authentication (Minimum)",
      level: "AA",
      principle: "UNDERSTANDABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/3-3-8.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#3-3-8"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "3.3.9" },
    update: {},
    create: {
      id: "3.3.9",
      title: "Accessible Authentication (Enhanced)",
      level: "AAA",
      principle: "UNDERSTANDABLE",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/3-3-9.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#3-3-9"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "4.1.1" },
    update: {},
    create: {
      id: "4.1.1",
      title: "Parsing",
      level: "A",
      principle: "ROBUST",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/4-1-1.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#4-1-1"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "4.1.2" },
    update: {},
    create: {
      id: "4.1.2",
      title: "Name, Role, Value",
      level: "A",
      principle: "ROBUST",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/4-1-2.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#4-1-2"
    },
  });
  await prisma.wcagCriterion.upsert({
    where: { id: "4.1.3" },
    update: {},
    create: {
      id: "4.1.3",
      title: "Status Messages",
      level: "AA",
      principle: "ROBUST",
      description: "",
      understandingUrl: "https://www.w3.org/WAI/WCAG22/Understanding/4-1-3.html",
      howToMeetUrl: "https://www.w3.org/WAI/WCAG22/quickref/#4-1-3"
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
