export default class Util {
  public static prettyDate(date: Date | string) {
    return `${new Date(date).getDate()} ${new Date(date).toLocaleDateString(
      'tr-TR',
      {month: 'long'},
    )}, ${new Date(date).getFullYear()}`;
  }

  public static prettyTime(date: Date | string) {
    const d = new Date(date);
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  }
}
