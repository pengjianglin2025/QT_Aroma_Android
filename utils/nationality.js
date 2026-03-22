export const fallbackNationalityList = [
	{ val: '中国大陆 (+86)', internationalCode: '86' },
	{ val: '中国香港 (+852)', internationalCode: '852' },
	{ val: '中国澳门 (+853)', internationalCode: '853' },
	{ val: '中国台湾 (+886)', internationalCode: '886' },
	{ val: 'United States (+1)', internationalCode: '1' },
	{ val: 'Canada (+1)', internationalCode: '1' },
	{ val: 'United Kingdom (+44)', internationalCode: '44' },
	{ val: 'Australia (+61)', internationalCode: '61' },
	{ val: 'Germany (+49)', internationalCode: '49' },
	{ val: 'France (+33)', internationalCode: '33' },
	{ val: 'Italy (+39)', internationalCode: '39' },
	{ val: 'Spain (+34)', internationalCode: '34' },
	{ val: 'Japan (+81)', internationalCode: '81' },
	{ val: 'South Korea (+82)', internationalCode: '82' },
	{ val: 'Singapore (+65)', internationalCode: '65' },
	{ val: 'Malaysia (+60)', internationalCode: '60' },
	{ val: 'Thailand (+66)', internationalCode: '66' },
	{ val: 'Vietnam (+84)', internationalCode: '84' },
	{ val: 'Indonesia (+62)', internationalCode: '62' },
	{ val: 'India (+91)', internationalCode: '91' },
	{ val: 'United Arab Emirates (+971)', internationalCode: '971' },
	{ val: 'Saudi Arabia (+966)', internationalCode: '966' },
	{ val: 'Russia (+7)', internationalCode: '7' },
	{ val: 'Brazil (+55)', internationalCode: '55' },
	{ val: 'Mexico (+52)', internationalCode: '52' }
]

function normalizeNationalityItem(item) {
	if (!item || typeof item !== 'object') {
		return null
	}
	const label = item.val || item.name || item.label || item.countryName || item.nationalityName || item.zhName || item.enName
	const code = item.internationalCode || item.countryCode || item.code || item.value || item.phoneCode
	if (!label && !code) {
		return null
	}
	const normalizedCode = code == null ? '' : String(code).replace(/^\+/, '')
	const normalizedLabel = label || normalizedCode
	return {
		...item,
		val: normalizedLabel,
		internationalCode: normalizedCode
	}
}

function normalizeNationalityArray(list) {
	if (!Array.isArray(list)) {
		return []
	}
	return list.map(normalizeNationalityItem).filter(Boolean)
}

export function normalizeNationalityList(res) {
	if (Array.isArray(res)) {
		return normalizeNationalityArray(res)
	}
	if (res && Array.isArray(res.data)) {
		return normalizeNationalityArray(res.data)
	}
	if (res && Array.isArray(res.list)) {
		return normalizeNationalityArray(res.list)
	}
	if (res && res.data && Array.isArray(res.data.list)) {
		return normalizeNationalityArray(res.data.list)
	}
	return []
}
