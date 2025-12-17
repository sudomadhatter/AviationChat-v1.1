from google.adk.agents import base_agent

class IndocAgent(base_agent.BaseAgent):
    """
    The Indoc Agent is responsible for onboarding new users.
    It interviews the user to establish a baseline and writes the initial
    JSON object to the pilot_metrics table in Cloud SQL.
    """

    def run(self, user_input: str) -> str:
        """
        Runs the Indoc Agent.

        Args:
            user_input: The user's input.

        Returns:
            A string with the agent's response.
        """
        # TODO: Implement the agent's logic here.
        # This will involve:
        # 1. Checking if the user is new or returning.
        # 2. If the user is new, ask a series of questions to establish a baseline.
        # 3. If the user is returning, check if their pilot_metrics are up to date.
        # 4. Write the pilot_metrics to the Cloud SQL database.

        return "Hello! I am the Indoc Agent. I'm here to help you get started. What is your name?"
