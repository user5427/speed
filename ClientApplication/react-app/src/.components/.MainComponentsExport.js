import { CreateEditArticle, ArticleList, ReturnToArticlesButton } from "./Articles/.MainArticlesExport";
import { CreateEditParagraph, listOfParagraphs } from  "./Paragraphs/.MainParagraphsExport";
import { CreateEditQuestion, listOfQuestions } from  "./Questions/.MainQuestionsExport";
import { QuestionComponent } from  "./Exercise/.MainExerciseExport";
import { FlashingText } from  "./HomePage/.MainHomePageExport";

// Export components/functions individually
export { CreateEditArticle, ArticleList, ReturnToArticlesButton };
export { CreateEditParagraph };
export { CreateEditQuestion };
export { QuestionComponent };
export { FlashingText };
export { listOfParagraphs as ParagraphList };
export { listOfQuestions as QuestionList };

// Export as grouped objects (optional, if you need them grouped)
export const MainArticles = {
    CreateEditArticle,
    ArticleList,
    ReturnToArticlesButton
};

export const MainParagraphs = {
    CreateEditParagraph
};

export const MainQuestions = {
    CreateEditQuestion
};

//const CreateEditArticle = React.lazy(() => import('./Articles/CreateEditArticle'));
//const ArticleList = React.lazy(() => import('./Articles/ArticleList'));