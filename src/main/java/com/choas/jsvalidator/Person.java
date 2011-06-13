package com.choas.jsvalidator;

public class Person {
	public String getFirstname() {
		return firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public Gender getGender() {
		return gender;
	}

	public String getBirthday() {
		return birthday;
	}

	String firstname;
	String lastname;
	Gender gender;
	String birthday;

	public Person() {
	}
}
