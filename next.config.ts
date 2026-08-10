import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import type { NextConfig } from "next";

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "preset-default",
                  params: { overrides: { removeViewBox: false } },
                },
                // 여러 SVG가 한 페이지에 인라인되면 svgo가 축약한 id(a, b…)끼리
                // 충돌해 다른 아이콘의 pattern/image를 참조한다. 파일명 접두사로 격리.
                "prefixIds",
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};

export default withVanillaExtract(nextConfig);
