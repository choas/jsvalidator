



var msgs = validate(obj, "person");


for(i=0; i < msgs.length; i++) {

/*
 * Simply said, don't try to access native JavaScript objects in your Java code. 
 * Use Java objects in the JavaScript code instead.
 * http://www.ibm.com/developerworks/library/wa-aj-javaee/
 */


	validateMsgs.add(msgs[i]);
}
		      