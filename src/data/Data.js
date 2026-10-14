import LambChops from "../image/1.jpg";
import ChickenSub from "../image/2.jpg";
import Pizza from "../image/3.jpg";
import GardenSalad from "../image/4.jpg";
import GrainBowl from "../image/10.jpg";
import Fusilli from "../image/11.jpg";
import PrawnMasala from "../image/12.jpg";
import Pancakes from "../image/13.jpg";
import AvocadoEgg from "../image/14.jpg";
import EggToast from "../image/15.jpg";
import FrenchToast from "../image/16.jpg";
import SalmonCurry from "../image/17.jpg";
import TandooriChicken from "../image/18.jpg";

export const brand = {
  name: "Saffron & Ember",
  tagline: "Modern Indian kitchen",
  phone: "1800-00-0000",
  phoneNote: "toll free",
  mobile: "1234567890",
  email: "help@myrest.com",
  address: "21 Spice Market Lane, Old Town",
};

export const categories = ["All", "Breakfast", "Bowls & Salads", "Mains", "Grill"];

export const MenuList = [
  {
    id: "lamb",
    name: "Spiced Lamb Chops",
    category: "Grill",
    description: "Kashmiri chilli marinade, charred over the tandoor and served with saffron rice and mint chutney.",
    image: LambChops,
    price: 24,
    tags: ["Chef's pick", "Spicy"],
    signature: true,
  },
  {
    id: "tandoori",
    name: "Tandoori Half Chicken",
    category: "Grill",
    description: "Yoghurt and garam masala, 24-hour marinade, finished with lime, pickled onion and herb salad.",
    image: TandooriChicken,
    price: 19,
    tags: ["Best seller"],
    signature: true,
  },
  {
    id: "prawn",
    name: "Prawn Masala & Rice",
    category: "Mains",
    description: "Tiger prawns in a tomato–coconut masala with curry leaves, served with steamed basmati.",
    image: PrawnMasala,
    price: 21,
    tags: ["Seafood"],
    signature: true,
  },
  {
    id: "salmon",
    name: "Salmon Coconut Curry",
    category: "Mains",
    description: "Kerala-style moilee with turmeric, green chilli and lemon, slow simmered in coconut milk.",
    image: SalmonCurry,
    price: 22,
    tags: ["Gluten free"],
    signature: true,
  },
  {
    id: "pizza",
    name: "Tandoori Chicken Pizza",
    category: "Mains",
    description: "Stone-baked base, smoky tikka chicken, red onion, peppers and fresh coriander.",
    image: Pizza,
    price: 17,
    tags: ["Sharing"],
  },
  {
    id: "fusilli",
    name: "Basil Fusilli Masala",
    category: "Mains",
    description: "Fusilli tossed in a light tomato masala with roasted garlic, basil and parmesan.",
    image: Fusilli,
    price: 15,
    tags: ["Vegetarian"],
  },
  {
    id: "sub",
    name: "Chicken Tikka Sub",
    category: "Grill",
    description: "Toasted multigrain roll, grilled tikka, crunchy slaw and masala fries with two dips.",
    image: ChickenSub,
    price: 13,
    tags: ["Lunch"],
  },
  {
    id: "bowl",
    name: "Sunny Grain Bowl",
    category: "Bowls & Salads",
    description: "Spiced lentils, sautéed greens, carrot, zucchini and mushrooms topped with a fried egg.",
    image: GrainBowl,
    price: 14,
    tags: ["High protein"],
  },
  {
    id: "salad",
    name: "Garden Crunch Salad",
    category: "Bowls & Salads",
    description: "Seasonal leaves, roasted chickpeas, paneer cubes and a tangy tamarind dressing.",
    image: GardenSalad,
    price: 11,
    tags: ["Vegetarian", "Light"],
  },
  {
    id: "avocado",
    name: "Avocado & Poached Egg",
    category: "Breakfast",
    description: "Sourdough, smashed avocado, poached egg, broccolini and a chilli-seed crunch.",
    image: AvocadoEgg,
    price: 12,
    tags: ["All day"],
  },
  {
    id: "eggtoast",
    name: "Masala Egg Toast",
    category: "Breakfast",
    description: "Golden fried egg on buttered toast with roasted tomatoes and a pinch of chaat masala.",
    image: EggToast,
    price: 9,
    tags: ["Classic"],
  },
  {
    id: "pancakes",
    name: "Blueberry Pancake Stack",
    category: "Breakfast",
    description: "Fluffy cardamom pancakes, fresh blueberries, whipped butter and warm maple syrup.",
    image: Pancakes,
    price: 10,
    tags: ["Sweet"],
  },
  {
    id: "frenchtoast",
    name: "Banana French Toast",
    category: "Breakfast",
    description: "Brioche soaked in saffron custard, caramelised banana, berries and jaggery syrup.",
    image: FrenchToast,
    price: 11,
    tags: ["Sweet", "Vegetarian"],
  },
];

export const heroSlides = [
  { image: TandooriChicken, kicker: "Fire-kissed grills", title: "Bold spices,", accent: "honest food." },
  { image: Pizza, kicker: "Fresh from the oven", title: "Best food in town,", accent: "baked with love." },
  { image: SalmonCurry, kicker: "Slow-cooked curries", title: "Every bowl tells", accent: "a story." },
];

export const highlights = [
  { icon: "spa", title: "Fresh every morning", text: "Spices ground in-house and produce from local farms, delivered daily." },
  { icon: "fire", title: "Real tandoor fire", text: "Our clay oven runs at 450°C for that smoky char you can’t fake." },
  { icon: "delivery", title: "Fast delivery", text: "Hot to your door in under 35 minutes, packed to travel well." },
];

export const testimonials = [
  { name: "Sara M.", role: "Food blogger", text: "The lamb chops are unreal — smoky, tender and perfectly spiced. My new favourite spot.", rating: 5 },
  { name: "Omar K.", role: "Regular guest", text: "Weekend brunch here is a ritual now. The saffron French toast is worth the trip alone.", rating: 5 },
  { name: "Daniel R.", role: "Ordered online", text: "Arrived hot, beautifully packed and tasted like it was served at the table. Impressive.", rating: 4 },
];

export const timeline = [
  { year: "2015", title: "A tiny kitchen", text: "Six tables, one tandoor and a family recipe book." },
  { year: "2018", title: "Brunch is born", text: "Our all-day breakfast menu turns quiet mornings into queues." },
  { year: "2021", title: "Online orders", text: "We bring the same plates to your door — fast and hot." },
  { year: "Today", title: "Still cooking", text: "A bigger dining room, same spices, same care." },
];

export const hours = [
  { day: "Mon – Thu", time: "11:00 – 22:00" },
  { day: "Fri – Sat", time: "10:00 – 23:30" },
  { day: "Sunday", time: "09:00 – 21:00" },
];

export const gallery = [LambChops, Pancakes, PrawnMasala, AvocadoEgg, Pizza, FrenchToast];
export const images = { LambChops, Pizza, SalmonCurry, TandooriChicken, GrainBowl, FrenchToast, PrawnMasala, Pancakes };
