const emojis = ["🤯", "😳", "😎", "😍", "🥵", "👌", "👍", "🙌", "🍇", "🍓"];

export function randEmoji() {
  return emojis[Math.floor(Math.random() * emojis.length)];
}
