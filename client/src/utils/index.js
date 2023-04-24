export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const timeString = date.toLocaleTimeString("ru-RU", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateString = date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return `${timeString}  ${dateString}`;
};

export function getSocialNetwork(domain) {
  switch (domain) {
    case "t.me":
      return "Telegram";
    case "facebook.com":
    case "uk-ua.facebook.com":
      return "Facebook";
    case "twitter.com":
      return "Twitter";
    case "instagram.com":
    case "www.instagram.com":
      return "Instagram";
    case "linkedin.com":
    case "ua.linkedin.com":
    case "www.linkedin.com":
      return "LinkedIn";
    case "tiktok.com":
    case "www.tiktok.com":
      return "TikTok";
    case "pinterest.com":
    case "ru.pinterest.com":
      return "Pinterest";
    case "youtube.com":
    case "www.youtube.com":
      return "YouTube";
    case "tumblr.com":
      return "Tumblr";
    case "snapchat.com":
    case "www.snapchat.com":
      return "Snapchat";
    case "reddit.com":
    case "www.reddit.com":
      return "Reddit";
    case "discord.com":
      return "Discord";
    case "github.com":
      return "GitHub";
    default:
      return domain;
  }
}

export function isUrlTest(str) {
  if (/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(str)) {
    return true;
  } else return false;
}
