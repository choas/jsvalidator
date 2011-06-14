package net.choas.jsvalidator;

import java.util.ArrayList;
import java.util.List;

import net.choas.jsvalidator.validate.JsValidation;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

/**
 * Unit test for JsValidation.
 */
public class JsValidationTest extends TestCase {
	
	/**
	 * JsValidation.
	 */
	JsValidation jv;
	/**
	 * Create the test case.
	 * 
	 * @param testName
	 *            name of the test case
	 */
	public JsValidationTest(String testName) {
		super(testName);
		jv = new JsValidation();
	}

	/**
	 * @return the suite of tests being tested
	 */
	public static Test suite() {
		return new TestSuite(JsValidationTest.class);
	}

	/**
	 * All fields mandatory.
	 */
	public void testAllMendatory() {
		List<String> validateMsgs = new ArrayList<String>();
		Person person = new Person();
		jv.run(person, validateMsgs);
		assertEquals(4, validateMsgs.size());
	}
	/**
	 * Birthday mandatory.
	 */
	public void testBirthdayMandatory() {
		List<String> validateMsgs = new ArrayList<String>();
		Person person = new Person();
		person.firstname = "F";
		person.lastname = "L";
		person.gender = Gender.Male;
		jv.run(person, validateMsgs);
		assertEquals(1, validateMsgs.size());
		assertTrue(validateMsgs.get(0).toLowerCase().contains("birthday"));
		
	}
	/**
	 * Person has to be older than 18 years.
	 */
	public void testOlderThan18Years() {
		List<String> validateMsgs = new ArrayList<String>();
		Person person = new Person();
		person.firstname = "F";
		person.lastname = "L";
		person.gender = Gender.Male;
		person.birthday = "2011/01/01";
		jv.run(person, validateMsgs);
		assertEquals(1, validateMsgs.size());
		assertTrue(validateMsgs.get(0).toLowerCase().contains("18"));
	}
	/**
	 * All tests fine.
	 */
	public void testAllFine() {
		List<String> validateMsgs = new ArrayList<String>();
		Person person = new Person();
		person.firstname = "F";
		person.lastname = "L";
		person.gender = Gender.Male;
		person.birthday = "1980/01/01";
		jv.run(person, validateMsgs);
		assertEquals(0, validateMsgs.size());
	}
}
