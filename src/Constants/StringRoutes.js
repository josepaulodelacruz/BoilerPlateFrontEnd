

class StringRoutes {

  //auth
  static login = '/login';

  static dashboard = '/'; 
  static subdivided =  '/subdivided';
  static subdivided_dashboard =  '/subdivided/dashboard';
  static view_plot = '/view-plots';
  static tct_monitoring = 'TCT-Monitoring';
  static site_locations = 'Site-Locations';

  static setup = '/setup';
  static users = '/setup/users';
  static users_tab = '/setup/users/tab';
  static users_permission = '/setup/users/tab/permission';
  static users_history = '/setup/users/tab/history';


  static modules = '/setup/modules';
  static modules_form = '/setup/modules/form';

  static legends = '/setup/legends';

  static projects = '/setup/projects';
  static project_viewed = '/setup/projects/view'
  static subdivided_project = '/setup/subdivided'
  static subdivided_project_viewed = '/setup/subdivided/view'
  static subdivided_project_edit_lot = '/setup/subdivided/lots/edit'

  //reports
  static report = '/reports';
  static report_crash = '/reports/crash';


}

export default StringRoutes;
