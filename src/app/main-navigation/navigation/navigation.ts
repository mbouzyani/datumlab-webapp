import {Injectable} from '@angular/core';
import {NextConfig} from '../../app-config';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'dashboard',
        title: 'Tableau de Bord',
        type: 'item',
        url: '/dashboard',
        icon: 'feather icon-home'
      },
      {
        id: 'page-layouts',
        title: 'Disposition Horizontale',
        type: 'item',
        url: '/layout/dashborad/horizontal',
        target: true,
        icon: 'feather icon-layout'
      }
    ]
  },
  {
    id: 'rapport',
    title: 'Rapports',
    type: 'group',
    icon: 'feather icon-layers',
    children: [
      {
        id: 'LCTT',
        title: 'Crédits Arrivant à Échéances',
        type: 'collapse',
        icon: 'feather icon-bar-chart',
        children: [
          {
            id: 'score',
            title: 'Distribution par Type Score',
            type: 'item',
            url: '/lctt/score'
          },
          {
            id: 'map',
            title: 'Distribution par Région',
            type: 'item',
            url: '/lctt/map'
          },
          {
            id: 'City',
            title: 'Distribution par Ville',
            type: 'item',
            url: '/lctt/city'
          },
          {
            id: 'capacity',
            title: 'Distribution par Capacité de Financement',
            type: 'item',
            url: '/lctt/capacity'
          },
          // {
          //   id: 'typeCredit',
          //   title: 'Distribution par Type de Crédit',
          //   type: 'item',
          //   url: '/basic/breadcrumb-paging'
          // }
        ]
      },
      {
        id: 'top4',
        title: 'Classification des Concurents',
        type: 'collapse',
        url: '/tfc/top4',
        icon: 'feather icon-pie-chart',
        children: [
          {
            id: 'cnbreclient',
            title: 'Classification par Nombre des Clients',
            type: 'item',
            url: '/top4/nbclient'
          },

          {
            id: 'cmontant',
            title: 'Classification par Montant',
            type: 'item',
            url: '/top4/amount'
          },

          {
            id: 'ctypecredit',
            title: 'Classification par Type des Crédits ',
            type: 'item',
            url: '/top4/loantype'
          },

         

          {
            id: 'ctcmap',
            title: 'Classification par Région',
            type: 'item',
            url: '/top4/maplt'
          },
        ]
      },
      {
        id: 'VD-DA',
        title: 'Vélocité de Décision',
        type: 'collapse',
        url: '/dv-da/nbclient',
        icon: 'feather icon-file-text',
        children: [
          {
            id: 'nbclient',
            title: 'Vélocité de Décision par Nombre des Clients',
            type: 'item',
            url: '/dv-da/nbclient'
          },
          {
            id: 'loantype',
            title: 'Vélocité de Décision par Type des Crédit',
            type: 'item',
            url: '/dv-da/loantype'
          },
          {
            id: 'mapdv',
            title: 'Vélocité de Décision par Région',
            type: 'item',
            url: '/dv-da/mapdv'
          },
        ]
      },
      {
        id: 'VD-CC',
        title: 'Vélocité de Conclusion de Contrat',
        type: 'collapse',
        url: '/dv-cc/nbclient',
        icon: 'feather icon-file-text',
        children: [
          {
            id: 'nbclient',
            title: 'Vélocité de Conclusion par Nombre des Clients',
            type: 'item',
            url: '/dv-cc/nbclient'
          },
          {
            id: 'loantype',
            title: 'Vélocité de Conclusion par Type des Crédit',
            type: 'item',
            url: '/dv-cc/loantype'
          },
          {
            id: 'mapdv',
            title: 'Vélocité de Conclusion par Région',
            type: 'item',
            url: '/dv-cc/mapdv'
          },
        ]
      },
      {
        id: 'CA',
        title: "Coût d'Acquisition Client",
        type: 'item',
        url: '/cac',
        icon: 'feather icon-activity'
      },
      
    ]
  },
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
