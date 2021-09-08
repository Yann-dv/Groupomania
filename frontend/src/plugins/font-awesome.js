import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faHome,
  faUser,
  faUserPlus,
  faUserSecret,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faFontAwesome } from '@fortawesome/free-brands-svg-icons'

library.add(faThumbsUp, faThumbsDown, faHome, faUser, faUserSecret, faUserPlus, 
  faSignInAlt, faSignOutAlt, faFontAwesome);

export { FontAwesomeIcon };
