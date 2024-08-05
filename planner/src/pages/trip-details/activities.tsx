import { CircleCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format, isValid, parseISO } from "date-fns";

interface IActivities {
  date: string;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
  }[];
}

export const Activities = () => {
  const { tripId } = useParams();
  const [activities, setActivities] = useState<IActivities[]>([]);

  useEffect(() => {
    api.get(`/trips/${tripId}/activities`).then((response) => {
      const activities = response.data.activities;

      // Agrupar atividades por data
      const groupedActivities = activities.reduce((acc: any, activity: any) => {
        const date = parseISO(activity.occurs_at).toISOString().split("T")[0];
        if (!acc[date]) {
          acc[date] = { date, activities: [] };
        }
        acc[date].activities.push(activity);
        return acc;
      }, {} as Record<string, IActivities>); // <- Asserção de tipo para o acumulador

      // Converter o objeto de volta para um array de IActivities
      const groupedActivitiesArray = Object.values(
        groupedActivities
      ) as IActivities[];
      setActivities(groupedActivitiesArray);
    });
  }, [tripId]);

  const parseAndFormatDate = (
    dateString: string | undefined,
    formatStr: string
  ) => {
    if (!dateString) return "";
    const date = parseISO(dateString);
    return isValid(date) ? format(date, formatStr) : "";
  };

  if (activities.length > 0) {
    console.log("maior!");
  } else {
    console.log("menor :(");
  }

  const activity = activities.map((act) => {
    return act;
  });

  console.log(activity);

  return (
    <div className="space-y-8">
      {activities.length > 0 ? (
        activities.map((category) => (
          <div key={category.date} className="space-y-2.5">
            <div className="flex gap-2 items-baseline">
              <span className="text-xl text-zinc-300 font-semibold">
                Dia {parseAndFormatDate(category.date, "d")}
              </span>
              <span className="text-xs text-zinc-500">
                {parseAndFormatDate(category.date, "EEEE")}
              </span>
            </div>
            <div className="space-y-2.5">
              {category.activities.map((activity) => (
                <div key={activity.id} className="space-y-2.5">
                  <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                    <CircleCheck className="size-5 text-lime-300" />
                    <span className="text-zinc-100">{activity.title}</span>
                    <span className="text-zinc-400 text-sm ml-auto">
                      {parseAndFormatDate(activity.occurs_at, "HH:mm")}h
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada.</p>
      )}
    </div>
  );
};
