import Login from "@app/components/auth/Login";
// import Dashboard from "@app/components/dashboard/Dashboard";
import Dashboard from "@app/components/scheduler/dashboard/Dashboard";
import Scheduler from "@app/components/scheduler/Scheduler";
import CreateQuiz from "@app/components/scheduler/create-quiz/CreateQuiz";
import Questionnaires from "@app/components/scheduler/questionnaires/Questionnaires";
import Questions from "@app/components/scheduler/questions/Questions";
import QuizSchedule from "@app/components/scheduler/quiz-schedule/QuizSchedule";
import RoleSelection from "@app/components/role-selection/RoleSelection";
import Participant from "@app/components/participant/Participant";

interface Route {
	path: string;
	name: string;
	component: React.ComponentType;
	child?: Route[]; // Nested child routes (optional)
}

/**
 * Application route configurations
 * Defines all the available routes and their components.
 */
const privateRoutes: Route[] = [
	{
		path: "",
		name: "Role Selection",
		component: RoleSelection, // Root route (home page)
	},
	{
		path: "scheduler",
		name: "Scheduler",
		component: Scheduler, // Root route (home page)
		child: [
			{
				path: "",
				name: "Dashboard",
				component: Dashboard, // Parent route for ticket-related pages
			},
			{
				path: "quiz-schedule",
				name: "Schedule",
				component: QuizSchedule, // Parent route for ticket-related pages
			},
			{
				path: "create-quiz",
				name: "Create Quiz",
				component: CreateQuiz, // Parent route for ticket-related pages
			},
			{
				path: "questionnaires",
				name: "Questionnaires",
				component: Questionnaires, // Parent route for ticket-related pages
			},
			{
				path: "questions",
				name: "Questions",
				component: Questions, // Parent route for ticket-related pages
			},
		],
	},
	{
		path: "participant",
		name: "Participant",
		component: Participant, // Root route (home page)
	},
];

const publicRoutes: Route[] = [
	{
		path: "",
		name: "Login",
		component: Login, // Parent route for ticket-related pages
	},
];

export { privateRoutes, publicRoutes };
