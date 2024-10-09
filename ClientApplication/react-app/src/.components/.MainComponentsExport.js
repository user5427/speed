import { CreateEditArticle, ArticleList, ReturnToArticlesButton } from "./Articles/.MainArticlesExport";
import { CreateEditParagraph } from  "./Paragraphs/.MainParagraphsExport";
import { CreateEditQuestion } from  "./Questions/.MainQuestionsExport";
import { QuestionComponent } from  "./Exercise/.MainExerciseExport";
import { FlashingText } from  "./HomePage/.MainHomePageExport";

// Export components/functions individually
export { CreateEditArticle, ArticleList, ReturnToArticlesButton };
export { CreateEditParagraph };
export { CreateEditQuestion };
export { QuestionComponent };
export { FlashingText };

// Export as grouped objects (optional, if you need them grouped)
export const MainArticles = {
    CreateEditArticle,
    ArticleList,
    ReturnToArticlesButton
};

export const MainParagraphs = {
    CreateEditParagraph,
    ParagraphList,
    ReturnToParagraphsButton
};

export const MainQuestions = {
    CreateEditQuestion,
    QuestionList,
    ReturnToQuestionsButton
};

//const CreateEditArticle = React.lazy(() => import('./Articles/CreateEditArticle'));
//const ArticleList = React.lazy(() => import('./Articles/ArticleList'));