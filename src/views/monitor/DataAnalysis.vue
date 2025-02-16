<template>
  <div class="dashboard">
    <!-- Statistic Cards -->
    <div class="stats-cards">
      <div class="card">
        <h3>Total Visits</h3>
        <p>{{ analytics.totalVisits }}</p>
      </div>
      <div class="card">
        <h3>Last 1 Hour Visits</h3>
        <p>{{ analytics.lastHourVisits }}</p>
      </div>
      <div class="card">
        <h3>Last 24 Hours Visits</h3>
        <p>{{ analytics.last24HoursVisits }}</p>
      </div>
      <div class="card">
        <h3>Unique Users</h3>
        <p>{{ analytics.uniqueUsers }}</p>
      </div>
    </div>

    <!-- Device Usage -->
    <h2>Device Usage</h2>
    <canvas id="deviceChart"></canvas>

    <!-- Daily Visits Trend -->
    <h2>Daily Visits Trend</h2>
    <canvas id="dailyChart"></canvas>

    <!-- Page Visits -->
    <h2>Page Visits</h2>
    <canvas id="pageChart"></canvas>
  </div>
  <button class="floating-button" @click="fetchAnalytics">
    Refresh
  </button>
</template>

<script>
import { onMounted, ref } from "vue";
import Chart from "chart.js/auto";
import { analyticService } from "@/api/userAnalyticAPI.js";

export default {
  setup() {
    const analytics = ref({
      totalVisits: 0,
      deviceUsage: {},
      last24HoursVisits: 0,
      lastHourVisits: 0,
      uniqueUsers: 0,
      pageVisits: {},
      dailyVisits: {}
    });

    // Fetch analytics data
    const fetchAnalytics = async () => {
      try {
        const response = await analyticService.analyticUserActivities();
        console.log(response);
        if (!response) {
          return "Response is null";
        }
        const data = await response.data;

        // Ensure data format is correct
        analytics.value = data || {
          totalVisits: 0,
          deviceUsage: {},
          last24HoursVisits: 0,
          lastHourVisits: 0,
          uniqueUsers: 0,
          pageVisits: {},
          dailyVisits: {}
        };

        updateCharts();
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    let deviceChart, dailyChart, pageChart;

    // Render charts
    const updateCharts = () => {
      if (deviceChart) deviceChart.destroy();
      if (dailyChart) dailyChart.destroy();
      if (pageChart) pageChart.destroy();

      const ctxDevice = document.getElementById("deviceChart").getContext("2d");
      deviceChart = new Chart(ctxDevice, {
        type: "pie",
        data: {
          labels: Object.keys(analytics.value.deviceUsage),
          datasets: [
            {
              label: "Device Usage",
              data: Object.values(analytics.value.deviceUsage),
              backgroundColor: ["#f87171", "#60a5fa", "#34d399", "#fbbf24"]
            }
          ]
        }
      });

      const ctxDaily = document.getElementById("dailyChart").getContext("2d");

      // Sort dates in ascending order
      const sortedDates = Object.keys(analytics.value.dailyVisits).sort((a, b) => new Date(a) - new Date(b));

      // Get corresponding visit data in sorted order
      const sortedVisits = sortedDates.map(date => analytics.value.dailyVisits[date]);

      dailyChart = new Chart(ctxDaily, {
        type: "line",
        data: {
          labels: sortedDates, // Use sorted dates
          datasets: [
            {
              label: "Daily Visits Trend",
              data: sortedVisits, // Use sorted visit data
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              borderWidth: 2
            }
          ]
        }
      });

      const ctxPage = document.getElementById("pageChart").getContext("2d");
      pageChart = new Chart(ctxPage, {
        type: "bar",
        data: {
          labels: Object.keys(analytics.value.pageVisits),
          datasets: [
            {
              label: "Page Visit Count",
              data: Object.values(analytics.value.pageVisits),
              backgroundColor: "#34d399"
            }
          ]
        }
      });
    };

    // Initial data fetch
    onMounted(() => {
      fetchAnalytics();
      // setInterval(fetchAnalytics, 10000); // Refresh data every 10 seconds
    });

    return { analytics, fetchAnalytics };
  }
};
</script>

<style scoped>
.dashboard {
  text-align: center;
}

.stats-cards {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}

.card {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-width: 150px;
}

canvas {
  max-width: 600px;
  margin: 20px auto;
}

.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #34d399;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.floating-button:hover {
  background-color: #34d399;
}
</style>