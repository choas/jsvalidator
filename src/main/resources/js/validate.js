/*
 * Copyright (c) 2011 Lars Gregori
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

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
