export default function getRandomUID(min, max) {
  return Math.ceil(Math.random() * (max - min) + min)
}
