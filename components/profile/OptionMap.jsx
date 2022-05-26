export default function OptionMap({ data }) {
  return data.map((item, i) => (
    <option key={i} value={item}>
      {item}
    </option>
  ))
}
