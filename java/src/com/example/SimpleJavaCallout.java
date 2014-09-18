package com.example;

import java.io.PrintWriter;
import java.io.StringWriter;
import com.apigee.flow.execution.ExecutionContext;
import com.apigee.flow.execution.ExecutionResult;
import com.apigee.flow.execution.spi.Execution;
import com.apigee.flow.message.MessageContext;

public class SimpleJavaCallout implements Execution{
	public ExecutionResult execute(MessageContext messageContext, ExecutionContext executionContext) {
		try
		{			
			messageContext.setVariable("response.content", "Payload set by a Java Callout");
			return ExecutionResult.SUCCESS;

		} catch (Exception e) {
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			String exceptionAsString = sw.toString();			
			messageContext.setVariable("ERROR_MESSAGE", exceptionAsString);
			return ExecutionResult.ABORT;
		}
	}
}
