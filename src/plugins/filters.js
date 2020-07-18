import Vue from 'vue'

Vue.filter('date', function (date, locale) {
    if (!date) return ''
    return date.toLocaleDateString(locale || 'de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
})

const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
Vue.filter('bytes', function (bytes, precision) {
    if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) {
        return '?'
    }
    let unit = 0

    while (bytes >= 1024) {
        bytes /= 1024
        unit++
    }

    return bytes.toFixed(+precision) + ' ' + units[unit]
})

Vue.filter('replaceColon', function (value) {
    return value.replace(':', ' - ')
})

Vue.filter('number', function (v) {
    return v
})
