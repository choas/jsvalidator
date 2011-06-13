
var MIN_AGE = 18;

function validate(obj, validateObjectName) {
	var method = this["validate_" + validateObjectName];
	var messages = new Array();
	method.call(this, obj, messages);
	return messages;
}

function validate_person(obj, msg) {
	_validate_firstname(obj, msg);
	_validate_lastname(obj, msg);
	_validate_gender(obj, msg);
	_validate_birthday(obj, msg);
}

function _validate_firstname(obj, msg) {
	_mandatory(obj, "firstname", msg);
}
function _validate_lastname(obj, msg) {
	_mandatory(obj, "lastname", msg);
}
function _validate_gender(obj, msg) {
	_mandatory(obj, "gender", msg);
}

function _validate_birthday(obj, msg) {
	if (_mandatory(obj, "birthday", msg)) {
		var birthday = ""+obj["birthday"];
		var isIso = /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(birthday);
		if (!isIso) {
			msg.push("ERROR birthday '" + birthday + "' has to be in ISO format (yyyy/mm/dd).");
			return;	
		}
		var minAgeDate = new Date();
		minAgeDate.setFullYear(minAgeDate.getFullYear() - MIN_AGE);
		var birthdayDate = new Date(birthday);
		if (! (minAgeDate > birthdayDate.valueOf())) {
			msg.push("ERROR person has to be at least " + MIN_AGE + " years old.");
		}
	}
}

function _mandatory(obj, prop, msg) {
	var res = true;
	var value = obj[prop];
	var valueStr = "" + obj[prop];
	if (value === null || typeof(value) === "undefined" || valueStr.length === 0) {
		msg.push("ERROR " + prop + " is mandatory.");
		res = false;
	}
	return res;
}
