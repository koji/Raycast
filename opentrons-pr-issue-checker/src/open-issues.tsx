import { MenuBarExtra, open, Icon, Image } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { personalAccessToken } from "./preferences";
import { Response } from "./types";

export default function Command() {
  const { data, isLoading } = useFetch<Response>(
    "https://api.github.com/search/issues?" +
      new URLSearchParams({ q: "is:issue repo:Opentrons/opentrons archived:false" }),
    {
      headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${personalAccessToken}` },
    }
  );

  // const getLabels = (labels: Label[]) => {
  //   const labelNames = labels.map(label => label.name)
  //   return labelNames.join(",")
  // }

  // data.items.map(issue => console.log(issue.labels.length))

  return (
    <MenuBarExtra icon="opentrons.png" isLoading={isLoading}>
      {data?.items.map((issue) => (issue.state === 'open' &&
        <MenuBarExtra.Item
          key={issue.number}
          title={issue.title}
          tooltip={issue.state === "open" ? "open" : "closed"}
          // tooltip={issue.labels.length !== 0 ? getLabels(issue.lables) : 'no label'}
          icon={{ source: issue.user?.avatar_url ?? Icon.PersonCircle, mask: Image.Mask.Circle }}
          onAction={() => open(issue.html_url)}
        />
      ))}
    </MenuBarExtra>
  );
}
