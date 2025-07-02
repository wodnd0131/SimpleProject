import { issueService } from './api/IssueService'
import { userService } from './api/UserService'
import { labelService } from './api/LabelService'
import { milestoneService } from './api/MilestoneService'
import { projectService } from './api/ProjectService'
import { dashboardService } from './api/DashboardService'
import { meetingMinutesService } from './api/MeetingMinutesService'
import { teamService } from './api/TeamService'

import { issueFixtures } from '@/fixtures/issues'
import { userFixtures } from '@/fixtures/users'
import { labelFixtures } from '@/fixtures/labels'
import { milestoneFixtures } from '@/fixtures/milestones'
import { projectFixtures } from '@/fixtures/projects'
import { dashboardFixtures } from '@/fixtures/dashboardService'
import { meetingMinutesFixtures } from '@/fixtures/meetingMinutesService'
import { teamServiceFixtures } from '@/fixtures/teamService'

const USE_FIXTURES = import.meta.env.VITE_USE_FIXTURES === 'true'

class ApiServiceProxy {
  get issues() {
    return USE_FIXTURES ? issueFixtures : issueService
  }

  get users() {
    return USE_FIXTURES ? userFixtures : userService
  }

  get labels() {
    return USE_FIXTURES ? labelFixtures : labelService
  }

  get milestones() {
    return USE_FIXTURES ? milestoneFixtures : milestoneService
  }

  get projects() {
    return USE_FIXTURES ? projectFixtures : projectService
  }

  get dashboard() {
    return USE_FIXTURES ? dashboardFixtures : dashboardService
  }

  get meetingMinutes() {
    return USE_FIXTURES ? meetingMinutesFixtures : meetingMinutesService
  }

  get team() {
    return USE_FIXTURES ? teamServiceFixtures : teamService
  }

  isUsingFixtures(): boolean {
    return USE_FIXTURES
  }

  getEnvironmentInfo() {
    return {
      useFixtures: USE_FIXTURES,
      apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
      environment: import.meta.env.MODE,
    }
  }
}

export const apiService = new ApiServiceProxy()
export default apiService