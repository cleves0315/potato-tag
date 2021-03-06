interface Sign {
  id: string;
  name: string;
  list: TabsData[];
  // type: string;
}
interface TabsData {
  active: boolean;
  audible: boolean;
  autoDiscardable: boolean;
  discarded: boolean;
  description: string;
  favIconUrl: string;
  groupId: number;
  height: number;
  highlighted: boolean;
  id: string;
  incognito: boolean;
  index: number;
  mutedInfo: { muted: boolean };
  pinned: boolean;
  selected: boolean;
  status: string;
  title: string;
  url: string;
  width: number;
  windowId: number;
}

export { Sign, TabsData };
