/**
 * 
 * @param {number} year 
 * @returns 
 */
function create(year) {
  var 週数 = 0;
  /** @type {CalWeek | null} */
  var lastWeek = null;
  var result = [1,2,3,4,5,6,7,8,9,10,11,12].map(month => {
    var 対象年月 = new YearMonth(year, month);
    var date = カレンダーの最初の日付を取得する(new Date(`${year}/${month}/1`));
    var cal = [];
    while(対象年月.以前(date)) {
      const week = [];
      for(var i = 0; i < 7; i++) {
        week.push(createCalDate(date, 対象年月));
        date.setDate(date.getDate() + 1);// 日付を1つ進める
      }
      if(lastWeek == null) {
        週数++;
      } else if(lastWeek.dates[0].日 != week[0].日) {
        週数++;
      }
      const w = new CalWeek(週数, week) 
      cal.push(w);
      lastWeek = w;
    }
    return new Calendar(対象年月, cal);
  })
  
  return result;
}

/**
 * 
 * @param {Date} 月初 
 * @returns 
 */
function カレンダーの最初の日付を取得する(月初) {
  const result = new Date(月初);
  result.setDate(result.getDate() - (result.getDay() > 0 ? result.getDay() - 1 : 7));
  return result;
}

class YearMonth {
  /** @type {number} */
  年;
  /** @type {number} */
  月;
  constructor(year, month) {
    this.年 = year;
    this.月 = month;
  }
  /**
   * 
   * @param {Date} date 
   * @returns 
   */
  以前(date) {
    return date.getFullYear() <= this.年 && date.getMonth() + 1 <= this.月
  }
}

class Calendar {
  /** @type {number} */
  年
  /** @type {number} */
  月;
  /** @type {CalWeek[]} */
  週;

  /**
   * 
   * @param {YearMonth} 年月 
   * @param {CalWeek[]} 週 
   */
  constructor(年月, 週) {
    this.年 = 年月.年;
    this.月 = 年月.月;
    this.週 = 週;
  }

}

class CalWeek {
  /** @type number */
  週数;
  /** @type {CalDate[]} */
  dates;

  /**
   * 
   * @param {number} 週数 
   * @param {CalDate[]} week 
   */
  constructor(週数, week) {
    this.週数 = 週数;
    this.dates = week;
  }
  push(date) {
    this.dates.push(date);
  }
}

/** 
 * @typedef CalDate
 * @property  {string} 日付
 * @property {number} 日
 * @property {string} 曜日
 * @property {number} day - js標準のDate型のday。日曜日が0
 * @property {string|undefined} 祝日名
 * @property {boolean} 日付が対象月外
 * @property {boolean} 土日
 * @property {boolean} 土日祝日
 * @property {boolean} 月末
 */
/**
 * 
 * @param {Date} 日付 
 * @param {YearMonth} 対象年月 
 * @returns {CalDate}
 */
function createCalDate(日付, 対象年月) {
  const 曜日 = ["日","月","火","水","木","金","土"][日付.getDay()]
  const 祝日名 = Holiday.getHoliday(日付)
  const 土日 = 曜日 == "土" || 曜日 == "日"
  var 月末の日付 = [new Date(日付)]
    .map(v => {
      // 翌月1日の前の日が当月末
      v.setDate(1);
      v.setMonth(v.getMonth() + 1);
      v.setDate(v.getDate() - 1);
      return v.toLocaleDateString();
    })[0]
  ;

  return {
    日付: 日付.toLocaleDateString(),
    日: 日付.getDate(),
    曜日,
    day: 日付.getDay(),
    祝日名,
    日付が対象月外: 日付.getFullYear() != 対象年月.年 || 日付.getMonth() + 1 != 対象年月.月,
    土日,
    土日祝日: !!祝日名 || 曜日 == "土" || 曜日 == "日",
    月末: 日付.toLocaleDateString() == 月末の日付
  };
}

class Holiday {
  /** @type {Date} */
  日付;
  /** @type {string} */
  祝日名;
  constructor(日付, 祝日名) {
    this.日付 = 日付;
    this.祝日名 = 祝日名; 
  }
  static def = {
    "2024/1/1":"元日",
    "2024/1/8":"成人の日",
    "2024/2/11":"建国記念の日",
    "2024/2/12":"振替休日",
    "2024/2/23":"天皇誕生日",
    "2024/3/20":"分の日",
    "2024/4/29":"昭和の日",
    "2024/5/3":"憲法記念日",
    "2024/5/4":"みどりの日",
    "2024/5/5":"こどもの日",
    "2024/5/6":"振替休日",
    "2024/7/15":"海の日",
    "2024/8/11":"山の日",
    "2024/8/12":"振替休日",
    "2024/9/16":"敬老の日",
    "2024/9/22":"秋分の日",
    "2024/9/23":"振替休日",
    "2024/10/14":"スポーツの日",
    "2024/11/3":"文化の日",
    "2024/11/4":"振替休日",
    "2024/11/23":"勤労感謝の日",

    "2025/1/1": "元日",
    "2025/1/13": "成人の日",
    "2025/2/11": "建国記念の日",
    "2025/2/23": "天皇誕生日",
    "2025/2/24": "振替休日",
    "2025/3/20": "春分の日",
    "2025/4/29": "昭和の日",
    "2025/5/3": "憲法記念日",
    "2025/5/4": "みどりの日",
    "2025/5/5": "こどもの日",
    "2025/5/6": "振替休日",
    "2025/7/21": "海の日",
    "2025/8/11": "山の日",
    "2025/9/15": "敬老の日",
    "2025/9/23": "秋分の日",
    "2025/10/13": "スポーツの日",
    "2025/11/3": "文化の日",
    "2025/11/23": "勤労感謝の日",
    "2025/11/24": "振替休日",
  }
  /** @type {any | null} */
  static repository = null;
  static getRepository() {
    if(Holiday.repository) {
      return Holiday.repository;
    }
    const repository = {};
    Object.keys(Holiday.def).forEach(d => {
      const ymd = d.split("/");
      if(!repository[ymd[0]]) {
        repository[ymd[0]] = {};
      }
      if(!repository[ymd[0]][ymd[1]]) {
        repository[ymd[0]][ymd[1]] = {};
      }
      repository[ymd[0]][ymd[1]][ymd[2]] = Holiday.def[d];
    })
    Holiday.repository = repository;
    return repository;
  }

  /**
   * 
   * @param {Date} 日付 
   * @returns {string | undefined}
   */
  static getHoliday(日付) {
    const repository = Holiday.getRepository();
    const ymd = 日付.toLocaleDateString().split("/");
    return repository[ymd[0]] && repository[ymd[0]][ymd[1]] && repository[ymd[0]][ymd[1]][ymd[2]]
  }
}

export var jpnCal = {};
jpnCal.create = create;