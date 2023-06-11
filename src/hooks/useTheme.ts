import React from 'react'
import { getItem } from '../Utils/Utils';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

export const useTheme = () => {
    const theme = getItem('theme');
    if(theme){
      document.body.classList.toggle(theme, true);
      Capacitor.isNativePlatform() &&
      StatusBar.setStyle({ style: theme=="dark"?Style.Dark:Style.Light });
    }
    else 
      Capacitor.isNativePlatform() &&
      StatusBar.setStyle({ style:Style.Light });
    return {theme}
}
