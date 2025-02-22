/* ------------------------------------------------------------------------- *
 * Copyright 2002-2021, OpenNebula Project, OpenNebula Systems               *
 *                                                                           *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may   *
 * not use this file except in compliance with the License. You may obtain   *
 * a copy of the License at                                                  *
 *                                                                           *
 * http://www.apache.org/licenses/LICENSE-2.0                                *
 *                                                                           *
 * Unless required by applicable law or agreed to in writing, software       *
 * distributed under the License is distributed on an "AS IS" BASIS,         *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  *
 * See the License for the specific language governing permissions and       *
 * limitations under the License.                                            *
 * ------------------------------------------------------------------------- */
import * as STATES from 'client/constants/states'
import * as ACTIONS from 'client/constants/actions'
import COLOR from 'client/constants/color'

/** @type {STATES.StateInfo[]} Virtual machine states */
export const VM_STATES = [
  { // 0
    name: STATES.INIT,
    color: COLOR.info.light,
    meaning: ''
  },
  { // 1
    name: STATES.PENDING,
    color: COLOR.info.light,
    meaning: ''
  },
  { // 2
    name: STATES.HOLD,
    color: COLOR.error.light,
    meaning: ''
  },
  { // 3
    name: STATES.ACTIVE,
    color: COLOR.success.light,
    meaning: ''
  },
  { // 4
    name: STATES.STOPPED,
    color: COLOR.error.light,
    meaning: ''
  },
  { // 5
    name: STATES.SUSPENDED,
    color: COLOR.error.light,
    meaning: ''
  },
  { // 6
    name: STATES.DONE,
    color: COLOR.debug.light,
    meaning: ''
  },
  { // 7
    name: STATES.FAILED,
    color: COLOR.error.dark,
    meaning: ''
  },
  { // 8
    name: STATES.POWEROFF,
    color: COLOR.error.light,
    meaning: ''
  },
  { // 9
    name: STATES.UNDEPLOYED,
    color: COLOR.error.light,
    meaning: ''
  },
  { // 10
    name: STATES.CLONING,
    color: COLOR.info.light,
    meaning: ''
  },
  { // 11
    name: STATES.CLONING_FAILURE,
    color: COLOR.error.dark,
    meaning: ''
  }
]

/** @type {STATES.StateInfo[]} Virtual machine lcm states */
export const VM_LCM_STATES = [
  { // 0
    name: STATES.LCM_INIT,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 1
    name: STATES.PROLOG,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 2
    name: STATES.BOOT,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 3
    name: STATES.RUNNING,
    color: COLOR.success.main,
    meaning: ''
  },
  { // 4
    name: STATES.MIGRATE,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 5
    name: STATES.SAVE_STOP,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 6
    name: STATES.SAVE_SUSPEND,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 7
    name: STATES.SAVE_MIGRATE,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 8
    name: STATES.PROLOG_MIGRATE,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 9
    name: STATES.PROLOG_RESUME,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 10
    name: STATES.EPILOG_STOP,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 11
    name: STATES.EPILOG,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 12
    name: STATES.SHUTDOWN,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 13
    name: STATES.CANCEL,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 14
    name: STATES.FAILURE,
    color: COLOR.warning.main,
    meaning: ''
  },
  { // 15
    name: STATES.CLEANUP_RESUBMIT,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 16
    name: STATES.UNKNOWN,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 17
    name: STATES.HOTPLUG,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 18
    name: STATES.SHUTDOWN_POWEROFF,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 19
    name: STATES.BOOT_UNKNOWN,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 20
    name: STATES.BOOT_POWEROFF,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 21
    name: STATES.BOOT_SUSPENDED,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 22
    name: STATES.BOOT_STOPPED,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 23
    name: STATES.CLEANUP_DELETE,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 24
    name: STATES.HOTPLUG_SNAPSHOT,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 25
    name: STATES.HOTPLUG_NIC,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 26
    name: STATES.HOTPLUG_SAVEAS,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 27
    name: STATES.HOTPLUG_SAVEAS_POWEROFF,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 28
    name: STATES.HOTPLUG_SAVEAS_SUSPENDED,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 29
    name: STATES.SHUTDOWN_UNDEPLOY,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 30
    name: STATES.EPILOG_UNDEPLOY,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 31
    name: STATES.PROLOG_UNDEPLOY,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 32
    name: STATES.BOOT_UNDEPLOY,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 33
    name: STATES.HOTPLUG_PROLOG_POWEROFF,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 34
    name: STATES.HOTPLUG_EPILOG_POWEROFF,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 35
    name: STATES.BOOT_MIGRATE,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 36
    name: STATES.BOOT_FAILURE,
    color: COLOR.warning.main,
    meaning: ''
  },
  { // 37
    name: STATES.BOOT_MIGRATE_FAILURE,
    color: COLOR.warning.main,
    meaning: ''
  },
  { // 38
    name: STATES.PROLOG_MIGRATE_FAILURE,
    color: COLOR.warning.main,
    meaning: ''
  },
  { // 39
    name: STATES.PROLOG_FAILURE,
    color: COLOR.warning.main,
    meaning: ''
  },
  { // 40
    name: STATES.EPILOG_FAILURE,
    color: COLOR.warning.main,
    meaning: ''
  },
  { // 41
    name: STATES.EPILOG_STOP_FAILURE,
    color: COLOR.warning.main,
    meaning: ''
  },
  { // 42
    name: STATES.EPILOG_UNDEPLOY_FAILURE,
    color: COLOR.warning.main,
    meaning: ''
  },
  { // 43
    name: STATES.PROLOG_MIGRATE_POWEROFF,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 44
    name: STATES.PROLOG_MIGRATE_POWEROFF_FAILURE,
    color: COLOR.warning.main,
    meaning: ''
  },
  { // 45
    name: STATES.PROLOG_MIGRATE_SUSPEND,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 46
    name: STATES.PROLOG_MIGRATE_SUSPEND_FAILURE,
    color: COLOR.warning.main,
    meaning: ''
  },
  { // 47
    name: STATES.BOOT_UNDEPLOY_FAILURE,
    color: COLOR.warning.main,
    meaning: ''
  },
  { // 48
    name: STATES.BOOT_STOPPED_FAILURE,
    color: COLOR.warning.main,
    meaning: ''
  },
  { // 49
    name: STATES.PROLOG_RESUME_FAILURE,
    color: COLOR.warning.main,
    meaning: ''
  },
  { // 50
    name: STATES.PROLOG_UNDEPLOY_FAILURE,
    color: COLOR.warning.main,
    meaning: ''
  },
  { // 51
    name: STATES.DISK_SNAPSHOT_POWEROFF,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 52
    name: STATES.DISK_SNAPSHOT_REVERT_POWEROFF,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 53
    name: STATES.DISK_SNAPSHOT_DELETE_POWEROFF,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 54
    name: STATES.DISK_SNAPSHOT_SUSPENDED,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 55
    name: STATES.DISK_SNAPSHOT_REVERT_SUSPENDED,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 56
    name: STATES.DISK_SNAPSHOT_DELETE_SUSPENDED,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 57
    name: STATES.DISK_SNAPSHOT,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 58
    name: STATES.DISK_SNAPSHOT_REVERT,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 59
    name: STATES.DISK_SNAPSHOT_DELETE,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 60
    name: STATES.PROLOG_MIGRATE_UNKNOWN,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 61
    name: STATES.PROLOG_MIGRATE_UNKNOWN_FAILURE,
    color: COLOR.warning.main,
    meaning: ''
  },
  { // 62
    name: STATES.DISK_RESIZE,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 63
    name: STATES.DISK_RESIZE_POWEROFF,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 64
    name: STATES.DISK_RESIZE_UNDEPLOYED,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 65
    name: STATES.HOTPLUG_NIC_POWEROFF,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 66
    name: STATES.HOTPLUG_RESIZE,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 67
    name: STATES.HOTPLUG_SAVEAS_UNDEPLOYED,
    color: COLOR.info.main,
    meaning: ''
  },
  { // 68
    name: STATES.HOTPLUG_SAVEAS_STOPPED,
    color: COLOR.info.main,
    meaning: ''
  }
]

/** @enum {string} Virtual machine actions */
export const VM_ACTIONS = {
  CREATE_DIALOG: 'create_dialog',
  DEPLOY: 'deploy',
  MIGRATE: 'migrate',
  MIGRATE_LIVE: 'migrate_live',
  MIGRATE_POFF: 'migrate_poff',
  MIGRATE_POFF_HARD: 'migrate_poff_hard',
  HOLD: 'hold',
  RELEASE: 'release',
  SUSPEND: 'suspend',
  RESUME: 'resume',
  STOP: 'stop',
  RECOVER: 'recover',
  REBOOT: 'reboot',
  REBOOT_HARD: 'reboot_hard',
  POWEROFF: 'poweroff',
  POWEROFF_HARD: 'poweroff_hard',
  UNDEPLOY: 'undeploy',
  UNDEPLOY_HARD: 'undeploy_hard',
  TERMINATE: 'terminate',
  TERMINATE_HARD: 'terminate_hard',
  RESCHED: 'resched',
  UNRESCHED: 'unresched',
  SAVE_AS_TEMPLATE: 'save_as_template',
  LOCK: 'lockU',
  UNLOCK: 'unlock',
  STAR_TVNC: 'startvnc',
  STAR_TVMRC: 'startvmrc',
  STAR_TSPICE: 'startspice',
  VNC: 'vnc',
  SSH: 'ssh',
  RDP: 'rdp',
  SAVE_RDP: 'save_rdp',
  SAVE_VIRT_VIEWER: 'save_virt_viewer',

  RENAME: ACTIONS.RENAME,
  CHANGE_MODE: ACTIONS.CHANGE_MODE,
  CHANGE_OWNER: ACTIONS.CHANGE_OWNER,
  CHANGE_GROUP: ACTIONS.CHANGE_GROUP,

  // CAPACITY
  RESIZE_CAPACITY: 'resize_capacity',

  // STORAGE
  ATTACH_DISK: 'attach_disk',
  DETACH_DISK: 'detach_disk',
  SNAPSHOT_DISK_CREATE: 'snapshot_disk_create',
  SNAPSHOT_DISK_REVERT: 'snapshot_disk_revert',
  SNAPSHOT_DISK_DELETE: 'snapshot_disk_delete',
  RESIZE_DISK: 'resize_disk',
  DISK_SAVEAS: 'disk_saveas',

  // NETWORK
  ATTACH_NIC: 'attach_nic',
  DETACH_NIC: 'detach_nic',

  // SNAPSHOT
  SNAPSHOT_CREATE: 'snapshot_create',
  SNAPSHOT_REVERT: 'snapshot_revert',
  SNAPSHOT_DELETE: 'snapshot_delete',

  // SCHEDULING ACTION
  SCHED_ACTION_CREATE: 'sched_action_create',
  SCHED_ACTION_UPDATE: 'sched_action_update',
  SCHED_ACTION_DELETE: 'sched_action_delete',
  CHARTER_CREATE: 'charter_create',

  // CONFIGURATION
  UPDATE_CONF: 'update_configuration'
}

/** @enum {string} Hypervisors  */
export const HYPERVISORS = {
  kvm: 'kvm',
  vcenter: 'vcenter',
  firecracker: 'firecracker',
  lxc: 'lxc'
}

/**
 * @enum {(
 * 'none' |
 * 'migrate' |
 * 'live-migrate' |
 * 'shutdown' |
 * 'shutdown-hard' |
 * 'undeploy' |
 * 'undeploy-hard' |
 * 'hold' |
 * 'release' |
 * 'stop' |
 * 'suspend' |
 * 'resume' |
 * 'boot' |
 * 'delete' |
 * 'delete-recreate' |
 * 'reboot' |
 * 'reboot-hard' |
 * 'resched' |
 * 'unresched' |
 * 'poweroff' |
 * 'poweroff-hard' |
 * 'disk-attach' |
 * 'disk-detach' |
 * 'nic-attach' |
 * 'nic-detach' |
 * 'disk-snapshot-create' |
 * 'disk-snapshot-delete' |
 * 'terminate' |
 * 'terminate-hard' |
 * 'disk-resize' |
 * 'deploy' |
 * 'chown' |
 * 'chmod' |
 * 'updateconf' |
 * 'rename' |
 * 'resize' |
 * 'update' |
 * 'snapshot-resize' |
 * 'snapshot-delete' |
 * 'snapshot-revert' |
 * 'disk-saveas' |
 * 'disk-snapshot-revert' |
 * 'recover' |
 * 'retry' |
 * 'monitor' |
 * 'disk-snapshot-rename' |
 * 'alias-attach' |
 * 'alias-detach' |
 * 'poweroff-migrate' |
 * 'poweroff-hard-migrate'
 * )} History actions
 */
export const HISTORY_ACTIONS = [
  'none',
  'migrate',
  'live-migrate',
  'shutdown',
  'shutdown-hard',
  'undeploy',
  'undeploy-hard',
  'hold',
  'release',
  'stop',
  'suspend',
  'resume',
  'boot',
  'delete',
  'delete-recreate',
  'reboot',
  'reboot-hard',
  'resched',
  'unresched',
  'poweroff',
  'poweroff-hard',
  'disk-attach',
  'disk-detach',
  'nic-attach',
  'nic-detach',
  'disk-snapshot-create',
  'disk-snapshot-delete',
  'terminate',
  'terminate-hard',
  'disk-resize',
  'deploy',
  'chown',
  'chmod',
  'updateconf',
  'rename',
  'resize',
  'update',
  'snapshot-resize',
  'snapshot-delete',
  'snapshot-revert',
  'disk-saveas',
  'disk-snapshot-revert',
  'recover',
  'retry',
  'monitor',
  'disk-snapshot-rename',
  'alias-attach',
  'alias-detach',
  'poweroff-migrate',
  'poweroff-hard-migrate'
]

/**
 * @enum {(
 * 'IP'|
 * 'IP6'|
 * 'IP6_GLOBAL'|
 * 'IP6_ULA'|
 * 'VROUTER_IP'|
 * 'VROUTER_IP6_GLOBAL'|
 * 'VROUTER_IP6_ULA'
 * )} Possible attribute names for nic alias ip
 */
export const NIC_ALIAS_IP_ATTRS = [
  'IP',
  'IP6',
  'IP6_GLOBAL',
  'IP6_ULA',
  'VROUTER_IP',
  'VROUTER_IP6_GLOBAL',
  'VROUTER_IP6_ULA'
]

/**
 * @enum {(
 * 'GUEST_IP'|
 * 'GUEST_IP_ADDRESSES'|
 * 'AWS_IP_ADDRESS'|
 * 'AWS_PUBLIC_IP_ADDRESS'|
 * 'AWS_PRIVATE_IP_ADDRESS'|
 * 'AZ_IPADDRESS'|
 * 'SL_PRIMARYIPADDRESS'
 * )} Possible attribute names for external ip
 */
export const EXTERNAL_IP_ATTRS = [
  'GUEST_IP',
  'GUEST_IP_ADDRESSES',
  'AWS_IP_ADDRESS',
  'AWS_PUBLIC_IP_ADDRESS',
  'AWS_PRIVATE_IP_ADDRESS',
  'AZ_IPADDRESS',
  'SL_PRIMARYIPADDRESS'
]
