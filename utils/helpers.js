
module.exports = {
    format_date: date => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate() + 1}/${new Date(
        date
      ).getFullYear()}`;
    },
    format_url: url => {
      return url
        .replace('http://', '')
        .replace('https://', '')
        .replace('www.', '')
        .split('/')[0]
        .split('?')[0];
    },
    format_plural: (word, amount) => {
      if (amount !== 1) {
        return `${word}s`;
      }
  
      return word;
    },
    format_time: time => {
      const parsedTime = parseFloat(time.replaceAll(':', '.'));
      const formattedTime = parsedTime.toString();
      if (parsedTime >= 11.59) {
        return `${formattedTime.replace('.', ':')} PM`;
      }
        return `${formattedTime.replace('.', ':')} AM`;
    }
  };
