import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useImmerAtom } from 'jotai/immer';
import { appsConfig } from '__/data/apps/apps-config';
import { CloseIcon } from '__/assets/traffic-icons/Close.svg';
import { MinimizeIcon } from '__/assets/traffic-icons/Minimize.svg';
import { GreenLightIcon } from '__/assets/traffic-icons/GreenLightIcon';
import { ButtonBase } from '__/components/utils/ButtonBase';
import { activeAppStore, AppID, openAppsStore } from '__/stores/apps.store';
import css from './TrafficLights.module.scss';

type TrafficLightProps = {
  appID: AppID;
  onMaximizeClick: () => void;
  class?: string | null;
};

export const TrafficLights = ({ appID, onMaximizeClick, class: className }: TrafficLightProps) => {
  const [, setOpenApps] = useImmerAtom(openAppsStore);
  const [activeApp] = useAtom(activeAppStore);

  const closeApp = () =>
    setOpenApps((openApps) => {
      openApps[appID] = false;
      return openApps;
    });

  const greenLightAction = () => {
    if (appsConfig[appID].expandable) {
      // Action not available right now!
    } else {
      onMaximizeClick();
    }
  };

  return (
    <div class={clsx(css.container, activeApp !== appID && css.unFocussed, className)}>
      <ButtonBase class={css.closeLight} onClick={closeApp}>
        <CloseIcon />
      </ButtonBase>
      <ButtonBase class={css.minimizeLight}>
        <MinimizeIcon />
      </ButtonBase>
      <ButtonBase class={css.stretchLight} onClick={greenLightAction}>
        <GreenLightIcon {...appsConfig[appID]} />
      </ButtonBase>
    </div>
  );
};
