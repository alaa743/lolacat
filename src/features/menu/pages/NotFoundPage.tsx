import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ErrorState } from "@/components/feedback/Feedback";
import { Button } from "@/components/ui/Button";

export default function NotFoundPage() {
  const { t } = useTranslation("common");

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <ErrorState
        title={t("common.notFoundTitle")}
        description={t("common.notFoundDesc")}
        action={
          <Button asChild>
            <Link to="/">{t("common.goHome")}</Link>
          </Button>
        }
      />
    </div>
  );
}
