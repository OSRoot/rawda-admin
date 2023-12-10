import { AnimationController, NavController } from '@ionic/angular';
const animationCtrl = new AnimationController();
// NavController
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
export const customAnimation = (_: HTMLElement, opts: any) =>{
  // create root transition
const rootTransition = animationCtrl
.create()
.duration(opts.duration ||350)
.easing('cubic-bezier(0.7,0,0.3,1)');

const enterTransition = animationCtrl.create().addElement(opts.enteringEl);
const exitTransition = animationCtrl.create().addElement(opts.leavingEl);

enterTransition.fromTo('opacity', '0', '1');
exitTransition.fromTo('opacity', '1', '0');

if (opts.direction === 'forward') {
  enterTransition.fromTo('transform', 'translateX(40%)', 'translateX(0%)');
  exitTransition.fromTo('transform', 'translateX(0%)', 'translateX(-40%)');
} else if (opts.direction === 'back'){
enterTransition.fromTo('transform', 'translateX(-40%)', 'translateX(0%)');
exitTransition.fromTo('transform', 'translateX(0%)', 'translateX(40%)');
}

rootTransition.addAnimation([enterTransition, exitTransition]);
return rootTransition;
}

