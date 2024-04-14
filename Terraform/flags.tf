resource "launchdarkly_feature_flag" "launchClubLoyalty" {
  project_key = var.project_key
  key         = "launchClubLoyalty"
  name        = "05 - Enable Launch Club Loyalty Program"
  description = "Enable Launch Club Loyalty Program on ToggleAirlines"

   variation_type = "boolean"
  variations {
    value = "true"
    name  = "Available"
  }
  variations {
    value = "false"
    name  = "Unavailable"
  }

  defaults {
    on_variation  = 0
    off_variation = 1
  }

  client_side_availability {
    using_environment_id = true
  }

  tags = [
    "target"
  ]
}

resource "launchdarkly_feature_flag" "priorityBoarding" {
  project_key = var.project_key
  key         = "priorityBoarding"
  name        = "06 - Launch Club - Priority Boarding"
  description = "Enable Launch Club Priority Program on ToggleAirlines"

   variation_type = "boolean"
  variations {
    value = "true"
    name  = "Available"
  }
  variations {
    value = "false"
    name  = "Unavailable"
  }

  defaults {
    on_variation  = 0
    off_variation = 1
  }

  client_side_availability {
    using_environment_id = true
  }

  tags = [
    "target"
  ]
}

resource "launchdarkly_feature_flag" "mealPromoExperience" {
  project_key = var.project_key
  key         = "mealPromoExperience"
  name        = "07 - Targeted Plane Meal Promotion"
  description = "Rolling our meal service on our A380 aircraft - free promotion for testing"

   variation_type = "boolean"
  variations {
    value = "true"
    name  = "Available"
  }
  variations {
    value = "false"
    name  = "Unavailable"
  }

  defaults {
    on_variation  = 0
    off_variation = 1
  }

  client_side_availability {
    using_environment_id = true
  }

  tags = [
    "target"
  ]
}

resource "launchdarkly_feature_flag" "aiTravelInsights" {
  project_key = var.project_key
  key         = "aiTravelInsights"
  name        = "08 - Release AI Travel Insights"
  description = "Amazon Bedrock Powered Travel Insights"

   variation_type = "boolean"
  variations {
    value = "true"
    name  = "Available"
  }
  variations {
    value = "false"
    name  = "Unavailable"
  }

  defaults {
    on_variation  = 0
    off_variation = 1
  }

  client_side_availability {
    using_environment_id = true
  }

  tags = [
    "target"
  ]
}