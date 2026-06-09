import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { UpdateHeaderDto } from './dto/update-header.dto';
import type { UpdateFooterDto } from './dto/update-footer.dto';

@Injectable()
export class ConfiguracionService {
  constructor(private prisma: PrismaService) {}

  async getHeader() {
    let header = await this.prisma.configHeader.findFirst();
    if (!header) {
      header = await this.prisma.configHeader.create({
        data: {},
      });
    }
    return header;
  }

  async updateHeader(dto: UpdateHeaderDto) {
    let header = await this.prisma.configHeader.findFirst();
    if (!header) {
      header = await this.prisma.configHeader.create({
        data: {},
      });
    }

    const data: Record<string, unknown> = {};
    if (dto.logo !== undefined) data.logo = dto.logo;
    if (dto.ctaText !== undefined) data.ctaText = dto.ctaText;
    if (dto.ctaLink !== undefined) data.ctaLink = dto.ctaLink;
    if (dto.navItems !== undefined) data.navItems = dto.navItems;

    return this.prisma.configHeader.update({
      where: { id: header.id },
      data,
    });
  }

  async resetHeader() {
    let header = await this.prisma.configHeader.findFirst();
    if (!header) {
      return this.prisma.configHeader.create({ data: {} });
    }
    return this.prisma.configHeader.update({
      where: { id: header.id },
      data: {
        logo: undefined,
        ctaText: undefined,
        ctaLink: undefined,
        navItems: undefined,
      },
    });
  }

  async getFooter() {
    let footer = await this.prisma.configFooter.findFirst();
    if (!footer) {
      footer = await this.prisma.configFooter.create({
        data: {},
      });
    }
    return footer;
  }

  async updateFooter(dto: UpdateFooterDto) {
    let footer = await this.prisma.configFooter.findFirst();
    if (!footer) {
      footer = await this.prisma.configFooter.create({
        data: {},
      });
    }

    const data: Record<string, unknown> = {};
    if (dto.logo !== undefined) data.logo = dto.logo;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.tags !== undefined) data.tags = dto.tags;
    if (dto.navItems !== undefined) data.navItems = dto.navItems;
    if (dto.contactAddress !== undefined) data.contactAddress = dto.contactAddress;
    if (dto.contactPhone !== undefined) data.contactPhone = dto.contactPhone;
    if (dto.contactEmail !== undefined) data.contactEmail = dto.contactEmail;
    if (dto.copyrightText !== undefined) data.copyrightText = dto.copyrightText;
    if (dto.copyrightSubtext !== undefined) data.copyrightSubtext = dto.copyrightSubtext;

    return this.prisma.configFooter.update({
      where: { id: footer.id },
      data,
    });
  }

  async resetFooter() {
    let footer = await this.prisma.configFooter.findFirst();
    if (!footer) {
      return this.prisma.configFooter.create({ data: {} });
    }
    return this.prisma.configFooter.update({
      where: { id: footer.id },
      data: {
        logo: undefined,
        description: undefined,
        tags: undefined,
        navItems: undefined,
        contactAddress: undefined,
        contactPhone: undefined,
        contactEmail: undefined,
        copyrightText: undefined,
        copyrightSubtext: undefined,
      },
    });
  }
}